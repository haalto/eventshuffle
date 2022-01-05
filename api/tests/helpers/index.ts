import { DBTables } from '../../src/core/enums';
import db from '../../src/data-layer/postgres';
import { app } from '../../src/app';

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

  afterAll(() => instance.close());

  return instance;
};
