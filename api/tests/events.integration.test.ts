import { cleanDatabase } from './helpers';

describe('events', () => {
  beforeEach(async () => await cleanDatabase());

  it('creates ', () => {
    expect(1).toBe(1);
  });
});
