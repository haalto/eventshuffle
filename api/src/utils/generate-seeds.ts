import { name, company, date } from 'faker';
import { times } from 'ramda';
import { generateRandomNumberBetween, pickRandomElement } from './helpers';

export const generateEvents = (n: number) => {
  return times(
    () => ({
      name: `${name.firstName()}'s ${company.bsBuzz()}`,
    }),
    n,
  );
};

export const generateEventDates = (eventIds: string[]) => {
  return eventIds
    .map(id => ({
      id,
      dates: date.betweens(
        '2021-01-01',
        '2021-01-05',
        generateRandomNumberBetween(3, 8),
      ),
    }))
    .map(eventDates =>
      eventDates.dates.map(date => ({ event_id: eventDates.id, date })),
    )
    .flat();
};

export const generateUsers = (n: number) => {
  return times(
    () => ({
      name: name.firstName(),
    }),
    n,
  );
};

export const generateVotesForEvent = (
  event: { id: string; dates: Date[] },
  userIds: string[],
) => {
  console.log(event.dates);
  const votes = userIds.map(userId => ({
    event_id: event.id,
    user_id: userId,
    date: pickRandomElement(event.dates),
  }));
  return votes;
};
