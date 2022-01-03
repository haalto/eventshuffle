import { Type, Static } from '@sinclair/typebox';
//Items
export const EventSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
});

export const EventVoteSchema = Type.Object({
  date: Type.String(),
  people: Type.Array(Type.String()),
});

export const EventWithDatesAndVotes = Type.Object({
  id: Type.String(),
  name: Type.String(),
  dates: Type.Array(Type.String()),
  votes: Type.Array(EventVoteSchema),
});

//Get event
export type GetEventParams = Static<typeof GetEventParamsSchema>;

export const GetEventParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
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
  dates: Type.Array(Type.String()),
});

export const PostEventResponseSchema = {
  200: Type.Object({
    id: Type.String({ format: 'uuid' }),
  }),
};

//Get event result
export type GetEventResultParams = Static<typeof GetEventResultParamsSchema>;

export const GetEventResultParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const GetEventResultResponseSchema = {
  200: Type.Object({
    id: Type.String(),
    name: Type.String(),
    suitableDates: Type.Array(EventVoteSchema),
  }),
};

//Post vote
export type PostVoteParams = Static<typeof PostVoteParamsSchema>;

export type PostVoteBody = Static<typeof PostVoteBodySchema>;

export const PostVoteParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const PostVoteBodySchema = Type.Object({
  name: Type.String(),
  votes: Type.Array(Type.String()),
});

export const PostVoteResponseSchema = {
  200: EventWithDatesAndVotes,
};
