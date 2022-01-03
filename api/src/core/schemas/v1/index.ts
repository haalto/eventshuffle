import { Type, Static } from '@sinclair/typebox';

export const EventSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
});

export const EventVoteSchema = Type.Object({
  date: Type.String(),
  people: Type.Array(Type.String()),
});

export type Event = Static<typeof EventSchema>;

export const EventListResponse200Schema = {
  200: Type.Object({
    events: Type.Array(EventSchema),
  }),
};

export const GetEventResponse200Schema = {
  200: Type.Object({
    id: Type.String(),
    name: Type.String(),
    dates: Type.Array(Type.String()),
    votes: Type.Array(EventVoteSchema),
  }),
};

export const PostEventBodySchema = Type.Object({
  name: Type.String(),
  dates: Type.Array(Type.String()),
});

export const PostEventResponse200Schema = {
  200: Type.String(),
};
