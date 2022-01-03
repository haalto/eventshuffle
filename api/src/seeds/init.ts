import { Knex } from 'knex';
import {
  generateEventDates,
  generateEvents,
  generateUsers,
  generateVotesForEvent,
} from '../utils/generate-seeds';
import { getEventWithDates } from '../v1/services/event';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('vote');
  await knex('event_date').del();
  await knex('user');
  await knex('event').del();

  //Generate events
  const events = generateEvents(10);
  const eventIds = await knex('event').insert(events).returning<string[]>('id');

  const eventDates = generateEventDates(eventIds);
  const dates = await knex('event_date')
    .insert(eventDates)
    .returning<Date[]>('date');

  //Generate users
  const users = generateUsers(10);
  const userIds = await knex('user').insert(users).returning<string[]>('id');

  const eventWithDates = (
    await Promise.all(eventIds.map(async id => await getEventWithDates(id)))
  ).flatMap(event => (!!event ? [event] : []));

  if (!eventWithDates) {
    return console.error('No events with dates when generating seeds.');
  }

  //Generate votes
  const votes = eventWithDates
    .map(event => generateVotesForEvent(event, userIds))
    .flat();
  await knex('vote').insert(votes);
}
