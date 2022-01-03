import { FastifyInstance } from 'fastify';
import { getEvents, getEvent, postEvent } from '../../controllers/v1/event';
import {
  EventListResponse200Schema,
  GetEventResponse200Schema,
  PostEventBodySchema,
  PostEventResponse200Schema,
} from '../../schemas/v1';

export const eventRoutes = (server: FastifyInstance) => {
  server.get(
    '/list',
    {
      schema: {
        response: EventListResponse200Schema,
      },
    },
    getEvents,
  );
  server.get(
    '/:id',
    {
      schema: {
        response: GetEventResponse200Schema,
      },
    },
    getEvent,
  );
  server.post(
    '/',
    {
      schema: {
        body: PostEventBodySchema,
        response: PostEventResponse200Schema,
      },
    },
    postEvent,
  );
  return server;
};
