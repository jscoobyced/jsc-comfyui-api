import { getCurrentDate } from './date';

describe('getCurrentDate', () => {
  test('returns a string in ISO format', () => {
    expect(getCurrentDate()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
  });
});
