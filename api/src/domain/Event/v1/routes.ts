import { FastifyInstance } from 'fastify';
import {
  getEvents,
  getEvent,
  postEvent,
  getEventResult,
  postVote,
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
    '/:id/result',
    {
      schema: {
        response: GetEventResultResponseSchema,
      },
    },
    getEventResult,
  );
  server.post(
    '/',
    {
      schema: {
        body: PostEventBodySchema,
        response: PostEventResponseSchema,
        params: GetEventResultParamsSchema,
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
