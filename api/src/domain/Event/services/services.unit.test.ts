import { groupVotesByDate } from './services';

it('returns database rows grouped by date with people', () => {
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
      name: 'Pumba',
      date: '2021-10-01',
    },
    {
      id: 'foo',
      event_id: 'bar',
      user_id: 'baz',
      name: 'Timon',
      date: '2021-10-02',
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = groupVotesByDate(data as any);

  expect(result).toEqual([
    { date: '2021-10-01', people: ['Väyrynen', 'Pumba'] },
    { date: '2021-10-02', people: ['Timon'] },
  ]);
});
