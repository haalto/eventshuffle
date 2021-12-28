import { FastifyInstance } from 'fastify';
import { getAllEvents, getEvent, postEvent } from '../controllers/event';

export const eventRoutes = (server: FastifyInstance) => {
  server.get('/', getEvent);
  server.get('/list', getAllEvents);
  server.post('/', postEvent);
  return server;
};
