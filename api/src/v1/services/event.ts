import db from '../../data-layer/postgres';
import { EventRow, UserRow, VoteRow } from '../../types';
import { Event } from '../schemas';

export const getAllEvents = async () => {
  return await db<EventRow>('event');
};

export const getEventById = async (id: string) => {
  const result = await db<Event>('event').where({ id }).first();
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

export const groupVotesByDate = (voteRows: (UserRow & VoteRow)[]) => {
  // Get unique dates
  const dates = [...new Set(voteRows.map((row) => row.date))];
  const votes = dates.map((date) => ({
    date,
    people: voteRows.filter((row) => row.date === date).map((v) => v.name),
  }));
  return votes;
};

export const getEventWithDatesAndVotes = async (id: string) => {
  const eventWithDates = await getEventWithDates(id);
  if (!eventWithDates) {
    return null;
  }

  const eventVotes = await getEventVotesWithUser(id);

  if (!eventVotes) {
    return null;
  }
  const votes = groupVotesByDate(eventVotes);
  console.log(votes);
  const { name, dates } = eventWithDates;

  return { id, name, dates, votes };
};
