import { generateEventDates, generateEvents } from './generate-seeds';
import { checkIfDateStringsAreIncludedInArrayOfDates } from './helpers';

describe('generate seed data', () => {
  it('generate n amount of events', () => {
    const events = generateEvents(10);
    expect(events.length).toBe(10);
    expect(events[0]).toMatchObject({
      name: expect.any(String),
    });
  });

  it('generate dates for event', () => {
    const eventIds = ['foo'];
    const eventDates = generateEventDates(eventIds);
    expect(eventDates[0].event_id).toBe('foo');
    expect(eventDates[0]).toMatchObject({
      event_id: 'foo',
      date: expect.any(Date),
    });
  });
});

describe('helper functions', () => {
  it('returns true if all the dates are included in array', () => {
    expect(
      checkIfDateStringsAreIncludedInArrayOfDates(
        ['2012-03-03', '2012-02-01'],
        [new Date('2012-03-03'), new Date('2012-02-01')],
      ),
    ).toBe(true);
    expect(
      checkIfDateStringsAreIncludedInArrayOfDates(
        ['2012-03-08'],
        [new Date('2012-03-03'), new Date('2012-02-01')],
      ),
    ).toBe(false);
  });
});
