import { DBTables } from '../../src/core/enums';
import db from '../../src/data-layer/postgres';
import { app } from '../../src/app';
import { FastifyInstance } from 'fastify';

const { EVENT_DATE, EVENT, VOTE, USER } = DBTables;

export const baseUrl = 'api/v1';

export const cleanDatabase = async () => {
  await db(VOTE).del();
  await db(EVENT_DATE).del();
  await db(USER).del();
  await db(EVENT).del();
};

export const build = () => {
  const instance = app();
  beforeAll(async () => {
    await instance.ready();
  });

  afterAll(async () => {
    await instance.close();
    await db.destroy();
  });
  return instance;
};

export const createTestEvent = async (
  app: FastifyInstance,
  payload: { name: string; dates: string[] },
) => {
  const { id } = (
    await app.inject({
      method: 'POST',
      url: `${baseUrl}/event`,
      payload,
    })
  ).json();
  return id;
};
