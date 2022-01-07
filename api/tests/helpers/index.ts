import { DBTables } from '../../src/core/enums';
import db from '../../src/data-layer/postgres';
import { app } from '../../src/app';
import { FastifyInstance } from 'fastify';

const { EVENT_DATE, EVENT, VOTE, USER } = DBTables;

export const baseUrl = 'api/v1';

const tables = [EVENT, VOTE, USER, EVENT_DATE];

export const cleanDatabase = async () => {
  tables.forEach(
    async table => await db.raw(`TRUNCATE TABLE ${table} CASCADE`),
  );
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
