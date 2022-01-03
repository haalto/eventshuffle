import { EventRow, UserRow, VoteRow } from '../types';
import { uniq } from 'ramda';
import db from '../../../data-layer/postgres';

export const getEventById = async (id: string) => {
  const result = await db<EventRow>('event').where({ id }).first();
  return result;
};

export const getEventDates = async (id: string) => {
  const dates = await db('event_date')
    .select('date')
    .where({ event_id: id })
    .pluck<Date[]>('date');
  return dates;
};

export const getEventVotesWithUser = async (id: string) => {
  const votes = await db<VoteRow>('vote')
    .where({ event_id: id })
    .leftJoin<UserRow>('user', 'vote.user_id', 'user.id');
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
  return await db<EventRow>('event');
};

/**
 * Add new event to the database inside transaction.
 */
export const createEvent = async (name: string, dates: string[]) => {
  return await db.transaction(async trx => {
    const id = (
      await db<EventRow>('event')
        .transacting(trx)
        .insert({ name })
        .returning<Pick<EventRow, 'id'>[]>('id')
    )[0];

    await db('event_date')
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
  console.log(votes[0].people);
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

/**
 * Get event result
 */
export const getEventResultById = async (id: string) => {
  //TODO: Actually calculate votes
  const result = await getEventVotesWithUser(id);
  return result;
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
      await db('user')
        .transacting(trx)
        .insert({ name })
        .returning<Pick<UserRow, 'id'>[]>('id')
    )[0];
    console.log(userId);
    await db('vote')
      .transacting(trx)
      .insert(
        votes.map(vote => ({ event_id: eventId, user_id: userId, date: vote })),
      );
  });
};
