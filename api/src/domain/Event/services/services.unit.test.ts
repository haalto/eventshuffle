import { groupVotesByDate } from './services';

it('returns database rows grouped by date with people', () => {
  const data = [
    {
      id: 'foo',
      event_id: 'bar',
      user_id: 'baz',
      name: 'Väyrynen',
      date: Date.parse('2021-10-01'),
    },
    {
      id: 'foo',
      event_id: 'bar',
      user_id: 'baz',
      name: 'Pumba',
      date: Date.parse('2021-10-01'),
    },
    {
      id: 'foo',
      event_id: 'bar',
      user_id: 'baz',
      name: 'Timon',
      date: Date.parse('2021-10-02'),
    },
  ];

  const result = groupVotesByDate(data as any);

  expect(result).toEqual([
    { date: Date.parse('2021-10-01'), people: ['Väyrynen', 'Pumba'] },
    { date: Date.parse('2021-10-02'), people: ['Timon'] },
  ]);
});
