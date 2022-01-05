import { baseUrl, build, cleanDatabase } from './helpers';

const app = build();

describe('events', () => {
  beforeAll(async () => await cleanDatabase());
  afterEach(async () => await cleanDatabase());

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
});
