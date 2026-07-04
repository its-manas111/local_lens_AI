import { checkRateLimit, _resetRateLimit } from '../utils/rateLimit';

beforeEach(() => {
  _resetRateLimit();
});

describe('checkRateLimit', () => {
  test('allows requests under the limit', () => {
    for (let i = 0; i < 9; i++) {
      expect(checkRateLimit()).toBe(true);
    }
  });

  test('blocks the 11th request within the window', () => {
    for (let i = 0; i < 10; i++) checkRateLimit();
    expect(checkRateLimit()).toBe(false);
  });

  test('returns true after reset', () => {
    for (let i = 0; i < 10; i++) checkRateLimit();
    _resetRateLimit();
    expect(checkRateLimit()).toBe(true);
  });
});