import Fastify, { FastifyServerOptions } from 'fastify';
import { eventRoutes } from './domain/Event/v1/routes';
import fastifySensible from 'fastify-sensible';

export const app = (opts?: FastifyServerOptions) => {
  const server = Fastify(opts);

  //Plugins
  server.register(fastifySensible);

  //Routes
  server.register(eventRoutes, { prefix: '/api/v1/event' });
  return server;
};
