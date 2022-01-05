import { DBTables } from '../../src/core/enums';
import db from '../../src/data-layer/postgres';
const { EVENT_DATE, EVENT, VOTE, USER } = DBTables;
export const cleanDatabase = async () => {
  await db(VOTE).del();
  await db(EVENT_DATE).del();
  await db(USER).del();
  await db(EVENT);
};
