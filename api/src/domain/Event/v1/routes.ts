import { FastifyInstance } from 'fastify';
import {
  getEvents,
  getEvent,
  postEvent,
  postVote,
  getEventResults,
} from './controllers';
import {
  GetEventListResponseSchema,
  GetEventParamsSchema,
  GetEventResponseSchema,
  GetEventResultParamsSchema,
  GetEventResultResponseSchema,
  PostEventBodySchema,
  PostEventResponseSchema,
  PostVoteBodySchema,
  PostVoteParamsSchema,
  PostVoteResponseSchema,
} from './schemas';

/**
 * Event routes
 */
export const eventRoutes = (server: FastifyInstance) => {
  server.get(
    '/list',
    {
      schema: {
        response: GetEventListResponseSchema,
      },
    },
    getEvents,
  );
  server.get(
    '/:id',
    {
      schema: {
        params: GetEventParamsSchema,
        response: GetEventResponseSchema,
      },
    },
    getEvent,
  );
  server.get(
    '/:id/results',
    {
      schema: {
        params: GetEventResultParamsSchema,
        response: GetEventResultResponseSchema,
      },
    },
    getEventResults,
  );
  server.post(
    '/',
    {
      schema: {
        body: PostEventBodySchema,
        response: PostEventResponseSchema,
      },
    },
    postEvent,
  );
  server.post(
    '/:id/vote',
    {
      schema: {
        params: PostVoteParamsSchema,
        body: PostVoteBodySchema,
        response: PostVoteResponseSchema,
      },
    },
    postVote,
  );
  return server;
};
