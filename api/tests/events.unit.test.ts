import {
  generateEventDates,
  generateEvents,
} from '../src/utils/generate-seeds';
import { groupVotesByDate } from '../src/v1/services/event';

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
  it('groupByVotes returns database rows grouped by date with people', () => {
    const data = [
      { name: 'Väyrynen', date: '2021-10-01' },
      { name: 'Pumba', date: '2021-10-01' },
      { name: 'Timon', date: '2021-10-02' },
    ];
    const result = groupVotesByDate(data as any);

    expect(result).toEqual([
      { date: '2021-10-01', people: ['Väyrynen', 'Pumba'] },
      { date: '2021-10-02', people: ['Timon'] },
    ]);
  });
});
