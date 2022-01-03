import Fastify from 'fastify';
import { eventRoutes } from './domain/Event/v1/routes';

export const app = () => {
  const server = Fastify({ logger: true });
  server.register(eventRoutes, { prefix: '/api/v1/event' });
  return server;
};
