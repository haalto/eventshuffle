import Fastify from 'fastify';
import { eventRoutes } from './core/routes/v1/event';

export const app = () => {
  const server = Fastify({ logger: true });
  server.register(eventRoutes, { prefix: '/api/v1/event' });
  return server;
};
