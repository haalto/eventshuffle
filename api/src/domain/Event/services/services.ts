import { EventRow, UserRow, VoteRow } from '../types';
import { uniq } from 'ramda';
import db from '../../../data-layer/postgres';
import { DBTables } from '../../../general/enums';

const { EVENT, USER, EVENT_DATE, VOTE } = DBTables;

export const getEventById = async (id: string) => {
  const result = await db<EventRow>(EVENT).where({ id }).first();
  return result;
};

export const getEventDates = async (id: string) => {
  const dates = await db(EVENT_DATE)
    .select('date')
    .where({ event_id: id })
    .pluck<Date[]>('date');
  return dates;
};

export const getEventVotesWithUser = async (id: string) => {
  const votes = await db<VoteRow>(VOTE)
    .where({ event_id: id })
    .leftJoin<UserRow>(USER, 'vote.user_id', 'event_user.id');
  return votes;
};

export const getEventWithDates = async (id: string) => {
  const event = await getEventById(id);

  if (!event) {
    return null;
  }

  const dates = await getEventDates(id);

  return {
    ...event,
    dates,
  };
};
/**
 * Get all events
 */
export const getAllEvents = async () => {
  return await db<EventRow>(EVENT);
};

/**
 * Add new event to the database inside transaction.
 */
export const createEvent = async (name: string, dates: string[]) => {
  return await db.transaction(async trx => {
    const id = (
      await db<EventRow>(EVENT)
        .transacting(trx)
        .insert({ name })
        .returning<Pick<EventRow, 'id'>[]>('id')
    )[0];

    await db(EVENT_DATE)
      .transacting(trx)
      .insert(dates.map(date => ({ event_id: id, date })));

    return id;
  });
};

export const groupVotesByDate = (voteRows: (UserRow & VoteRow)[]) => {
  // Get unique dates
  const uniqueDates = uniq(voteRows.map(vote => vote.date));
  const userWhoVotedByDate = (date: Date) => {
    const users = voteRows.filter(
      row => row.date.toString() === date.toString(),
    );
    return users.map(user => user.name);
  };

  const votes = uniqueDates.map(date => ({
    date,
    people: userWhoVotedByDate(date),
  }));
  return votes;
};

/**
 * Get event with dates and votes
 */
export const getEventWithDatesAndVotesById = async (id: string) => {
  const eventWithDates = await getEventWithDates(id);

  if (!eventWithDates) {
    return null;
  }

  const eventVotes = await getEventVotesWithUser(id);

  if (!eventVotes) {
    return null;
  }

  const votes = groupVotesByDate(eventVotes);

  const { name, dates } = eventWithDates;
  return { id, name, dates, votes };
};

const getSuitableDates = (votes: (VoteRow & UserRow)[]) => {
  const uniqueUsers = uniq(votes.map(vote => vote.user_id)).length;
  const groupedVotes = groupVotesByDate(votes);
  const suitableDates = groupedVotes.filter(
    group => group.people.length === uniqueUsers,
  );
  return suitableDates;
};

export const getEventNameById = async (id: string) => {
  const result = await db(EVENT)
    .select<Pick<EventRow, 'name'>>('name')
    .where({ id })
    .first();
  return result?.name;
};

/**
 * Get event result
 */
export const getEventResultsById = async (id: string) => {
  const name = await getEventNameById(id);
  if (!name) {
    return null;
  }
  const votes = await getEventVotesWithUser(id);
  const suitableDates = getSuitableDates(votes);

  return { id, name, suitableDates };
};

/**
 * Create vote
 */
export const createVote = async (
  eventId: string,
  name: string,
  votes: string[],
) => {
  await db.transaction(async trx => {
    const userId = (
      await db(USER)
        .transacting(trx)
        .insert({ name })
        .returning<Pick<UserRow, 'id'>[]>('id')
    )[0];
    await db(VOTE)
      .transacting(trx)
      .insert(
        votes.map(vote => ({ event_id: eventId, user_id: userId, date: vote })),
      );
  });
};
