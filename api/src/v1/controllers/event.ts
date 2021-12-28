import { FastifyRequest, FastifyReply } from 'fastify';

export const getEvent = (request: FastifyRequest, reply: FastifyReply) => {
  console.log('moro');
  reply.send({ message: 'moro' });
};

export const postEvent = (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(1);
};

export const getAllEvents = (request: FastifyRequest, reply: FastifyReply) => {
  console.log('moro');
  reply.send({ message: 'moro' });
};
