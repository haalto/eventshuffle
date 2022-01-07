import Fastify from 'fastify';
import { eventRoutes } from './domain/Event/v1/routes';
import fastifySensible from 'fastify-sensible';

export const app = () => {
  const server = Fastify({ logger: true });
  server.register(fastifySensible);
  server.register(eventRoutes, { prefix: '/api/v1/event' });
  return server;
};
