import { Knex } from 'knex';
import { getEventWithDates } from '../src/domain/Event/services/services';
import {
  generateEventDates,
  generateEvents,
  generateUsers,
  generateVotesForEvent,
} from '../src/utils/generate-seeds';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('vote').del();
  await knex('event_date').del();
  await knex('user').del();
  await knex('event').del();

  //Generate events
  const events = generateEvents(10);
  const eventIds = await knex('event').insert(events).returning<string[]>('id');

  const eventDates = generateEventDates(eventIds);
  await knex('event_date').insert(eventDates).returning<Date[]>('date');

  //Generate users
  const users = generateUsers(10);
  const userIds = await knex('user').insert(users).returning<string[]>('id');

  const eventWithDates = (
    await Promise.all(eventIds.map(async id => await getEventWithDates(id)))
  ).flatMap(event => (event ? [event] : []));

  if (!eventWithDates) {
    return console.error('No events with dates when generating seeds.');
  }

  //Generate votes
  const votes = eventWithDates
    .map(event => generateVotesForEvent(event, userIds))
    .flat();
  await knex('vote').insert(votes);
}
