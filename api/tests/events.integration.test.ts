import { createVote } from '../src/domain/Event/services';
import { baseUrl, build, cleanDatabase, createTestEvent } from './helpers';
import { testEvent1 } from './test-data';
import db from '../src/data-layer/postgres';
import { UserRow } from '../src/domain/Event/types';
import { DBTables } from '../src/core/enums';

const app = build();

describe('events happy path', () => {
  beforeEach(async () => await cleanDatabase());

  it('creates new event', async () => {
    const newEvent = { name: 'test event1', dates: ['2021-12-12'] };
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event`,
      payload: newEvent,
    });
    expect(res.statusCode).toBe(200);
  });

  it('returns empty list of events', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `${baseUrl}/event/list`,
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ events: [] });
  });

  it('user can vote', async () => {
    const newEvent = {
      name: 'test event1',
      dates: ['2021-12-12', '2021-12-13'],
    };
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event`,
      payload: newEvent,
    });
    const { id } = await res.json();
    const vote = { name: 'Post Malone', votes: ['2021-12-12', '2021-12-13'] };
    const postVoteRes = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event/${id}/vote`,
      payload: vote,
    });
    expect(postVoteRes.statusCode).toBe(200);
    expect(postVoteRes.json()).toEqual({
      id,
      name: 'test event1',
      dates: ['2021-12-12', '2021-12-13'],
      votes: [
        {
          date: '2021-12-13',
          people: ['Post Malone'],
        },
        {
          date: '2021-12-12',
          people: ['Post Malone'],
        },
      ],
    });
  });

  it('return event result', async () => {
    const newEvent = {
      name: 'test event1',
      dates: ['2021-12-12', '2021-12-13'],
    };
    const votes = [
      { name: 'Pekka', votes: ['2021-12-12', '2021-12-13'] },
      { name: 'Post Malone', votes: ['2021-12-12'] },
    ];

    //Create event
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event`,
      payload: newEvent,
    });
    const { id } = await res.json();

    //Vote
    await Promise.all(
      votes.map(
        async vote =>
          await app.inject({
            method: 'POST',
            url: `${baseUrl}/event/${id}/vote`,
            payload: vote,
          }),
      ),
    );
    const result = await app.inject({
      method: 'GET',
      url: `${baseUrl}/event/${id}/results`,
    });
    expect(result.statusCode).toBe(200);
    expect(await result.json()).toEqual({
      id,
      name: 'test event1',
      suitableDates: [
        {
          date: '2021-12-12',
          people: ['Pekka', 'Post Malone'],
        },
      ],
    });
  });
});

describe('error cases', () => {
  beforeEach(async () => await cleanDatabase());

  it('returns 400 error when event is post without dates', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event`,
      payload: { name: 'test' },
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual(
      "body should have required property 'dates'",
    );
  });

  it('returns 400 error when event is posted without name', async () => {
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event`,
      payload: { dates: ['2020-05-05'] },
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual(
      "body should have required property 'name'",
    );
  });

  it('returns 400 error when voting without name', async () => {
    const id = await createTestEvent(app, testEvent1);
    const vote = { votes: ['2021-12-12', '2021-12-13'] };
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event/${id}/vote`,
      payload: vote,
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual(
      "body should have required property 'name'",
    );
  });

  it('returns 400 error when voting without dates', async () => {
    const id = await createTestEvent(app, testEvent1);
    const vote = { name: testEvent1.name };
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event/${id}/vote`,
      payload: vote,
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual(
      "body should have required property 'votes'",
    );
  });

  it('returns 400 error when user tries to vote for date which is not included in the event', async () => {
    const id = await createTestEvent(app, testEvent1);
    const vote = { name: 'Moro', votes: ['2012-03-12'] };
    const res = await app.inject({
      method: 'POST',
      url: `${baseUrl}/event/${id}/vote`,
      payload: vote,
    });
    expect(res.statusCode).toBe(400);
    expect(res.json().message).toEqual('dates do not belong to event');
  });

  it('return 404 when trying to get non-existing event', async () => {
    const res = await app.inject({
      method: 'GET',
      url: `${baseUrl}/event/8fa3ff87-d405-4634-a1bb-ccd62f61e2af`,
    });
    expect(res.statusCode).toBe(404);
  });
});

describe('event services', () => {
  beforeEach(async () => await cleanDatabase());

  it('user is not created when creating a vote for non-existent event', async () => {
    try {
      expect(await createVote('', 'Pekka', ['2012-01-01'])).toThrow();
    } catch (err) {}
    const users = await db<UserRow>(DBTables.USER);
    expect(users).toEqual([]);
  });
});
