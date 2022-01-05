import { Type, Static } from '@sinclair/typebox';
import { DateSchema, uuidSchema } from '../../../core/schemas';

//Items
export const EventSchema = Type.Object({
  id: uuidSchema,
  name: Type.String(),
});

export const EventVoteSchema = Type.Object({
  date: DateSchema,
  people: Type.Array(Type.String()),
});

export const EventWithDatesAndVotes = Type.Object({
  id: uuidSchema,
  name: Type.String(),
  dates: Type.Array(DateSchema),
  votes: Type.Array(EventVoteSchema),
});

//Get event
export type GetEventParams = Static<typeof GetEventParamsSchema>;

export const GetEventParamsSchema = Type.Object({
  id: uuidSchema,
});

export const GetEventResponseSchema = {
  200: EventWithDatesAndVotes,
};

//Get all events
export const GetEventListResponseSchema = {
  200: Type.Object({
    events: Type.Array(EventSchema),
  }),
};

//Post event
export type PostEventBody = Static<typeof PostEventBodySchema>;

export const PostEventBodySchema = Type.Object({
  name: Type.String(),
  dates: Type.Array(DateSchema),
});

export const PostEventResponseSchema = {
  200: Type.Object({
    id: uuidSchema,
  }),
};

//Get event result
export type GetEventResultParams = Static<typeof GetEventResultParamsSchema>;

export const GetEventResultParamsSchema = Type.Object({
  id: uuidSchema,
});

export const GetEventResultResponseSchema = {
  200: Type.Object({
    id: uuidSchema,
    name: Type.String(),
    suitableDates: Type.Array(EventVoteSchema),
  }),
};

//Post vote
export type PostVoteParams = Static<typeof PostVoteParamsSchema>;

export type PostVoteBody = Static<typeof PostVoteBodySchema>;

export const PostVoteParamsSchema = Type.Object({
  id: uuidSchema,
});

export const PostVoteBodySchema = Type.Object({
  name: Type.String(),
  votes: Type.Array(Type.String()),
});

export const PostVoteResponseSchema = {
  200: EventWithDatesAndVotes,
};
