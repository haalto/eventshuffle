import { getSuitableDates, groupVotesByDate } from './services';

describe('event services', () => {
  it('returns database rows grouped by date with people', () => {
    const data = [
      {
        id: 'baz1',
        event_id: 'bar',
        user_id: 'baz1',
        name: 'Väyrynen',
        date: '2021-10-01',
      },
      {
        id: 'baz2',
        event_id: 'bar',
        user_id: 'baz2',
        name: 'Pumba',
        date: '2021-10-01',
      },
      {
        id: 'baz3',
        event_id: 'bar',
        user_id: 'baz3',
        name: 'Timon',
        date: '2021-10-02',
      },
    ];

    const result = groupVotesByDate(data as any);

    expect(result).toEqual([
      { date: '2021-10-01', people: ['Väyrynen', 'Pumba'] },
      { date: '2021-10-02', people: ['Timon'] },
    ]);
  });

  it('return suitable dates with name only once even with multiple votes', () => {
    const data = [
      {
        id: 'foo',
        event_id: 'bar',
        user_id: 'baz',
        name: 'Väyrynen',
        date: '2021-10-01',
      },
      {
        id: 'foo',
        event_id: 'bar',
        user_id: 'baz',
        name: 'Väyrynen',
        date: '2021-10-01',
      },
    ];

    const result = getSuitableDates(data as any);
    expect(result).toEqual([{ date: '2021-10-01', people: ['Väyrynen'] }]);
  });

  it('return suitable dates with name only once even with multiple votes', () => {
    const data = [
      {
        id: 'foo',
        event_id: 'bar',
        user_id: 'baz',
        name: 'Väyrynen',
        date: '2021-10-01',
      },
      {
        id: 'foo1',
        event_id: 'bar',
        user_id: 'baz1',
        name: 'Marin',
        date: '2021-10-01',
      },
    ];

    const result = getSuitableDates(data as any);
    expect(result).toEqual([
      { date: '2021-10-01', people: ['Väyrynen', 'Marin'] },
    ]);
  });
});
