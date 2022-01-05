import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createEvent,
  createVote,
  getAllEvents,
  getEventResultsById,
  getEventWithDatesAndVotesById,
} from '../services';

import {
  GetEventParams,
  GetEventResultParams,
  PostEventBody,
  PostVoteBody,
  PostVoteParams,
} from './schemas';

export const getEvent = async (
  request: FastifyRequest<{ Params: GetEventParams }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const event = await getEventWithDatesAndVotesById(id);
  if (!event) {
    reply.status(404);
    reply.send({ message: 'event not found' });
  }
  reply.send(event);
};

export const postEvent = async (
  request: FastifyRequest<{ Body: PostEventBody }>,
  reply: FastifyReply,
) => {
  const { name, dates } = request.body;
  const id = await createEvent(name, dates);

  reply.send({ id });
};

export const getEvents = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const events = await getAllEvents();
  reply.send({ events });
};

export const getEventResults = async (
  request: FastifyRequest<{ Params: GetEventResultParams }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const event = await getEventResultsById(id);
  reply.send(event);
};

export const postVote = async (
  request: FastifyRequest<{ Params: PostVoteParams; Body: PostVoteBody }>,
  reply: FastifyReply,
) => {
  const { id } = request.params;
  const { name, votes } = request.body;
  await createVote(id, name, votes);
  const event = await getEventWithDatesAndVotesById(id);
  reply.send(event);
};
