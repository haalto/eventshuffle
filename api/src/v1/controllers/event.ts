import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllEvents, getEventWithDatesAndVotes } from '../services/event';

export const getEvent = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as { id: string };
  const event = await getEventWithDatesAndVotes(id);
  console.log(event);
  reply.send(event);
};

export const postEvent = (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(1);
};

export const getEvents = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const events = await getAllEvents();
  reply.send({ events });
};
