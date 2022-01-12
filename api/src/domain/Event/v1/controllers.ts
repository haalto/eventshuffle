import { FastifyRequest, FastifyReply } from 'fastify';
import { checkIfDateStringsAreIncludedInArrayOfDates } from '../../../utils/helpers';
import {
  createEvent,
  createVote,
  getAllEvents,
  getEventDates,
  getEventResultsById,
  getEventWithDatesAndVotesById,
} from '../services/services';

import {
  GetEventParams,
  GetEventResultParams,
  PostEventBody,
  PostVoteBody,
  PostVoteParams,
} from './schemas';

/**
 * Get event
 * @param request
 * @param reply
 */
export const getEvent = async (
  request: FastifyRequest<{ Params: GetEventParams }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const event = await getEventWithDatesAndVotesById(id);
  if (!event) {
    reply.notFound();
  }
  reply.send(event);
};

/**
 * Create new event
 * @param request
 * @param reply
 */
export const postEvent = async (
  request: FastifyRequest<{ Body: PostEventBody }>,
  reply: FastifyReply,
) => {
  const { name, dates } = request.body;
  const id = await createEvent(name, dates);

  reply.send({ id });
};

/**
 *
 * @param request Get all events
 * @param reply
 */
export const getEvents = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const events = await getAllEvents();
  reply.send({ events });
};

/**
 * Get event results
 * @param request
 * @param reply
 */
export const getEventResults = async (
  request: FastifyRequest<{ Params: GetEventResultParams }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const event = await getEventResultsById(id);
  reply.send(event);
};

/**
 * Create new vote
 * @param request
 * @param reply
 */
export const postVote = async (
  request: FastifyRequest<{ Params: PostVoteParams; Body: PostVoteBody }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const { name, votes } = request.body;
  const eventDates = await getEventDates(id);

  //Validate that vote dates belong to the event
  if (!checkIfDateStringsAreIncludedInArrayOfDates(votes, eventDates)) {
    reply.status(400);
    reply.send({ message: 'dates do not belong to event' });
  }

  await createVote(id, name, votes);
  const event = await getEventWithDatesAndVotesById(id);
  reply.send(event);
};
