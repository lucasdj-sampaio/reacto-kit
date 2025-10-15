/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { normalizeRange } from '../util/functions';

describe('functions', () => {
  it('normalizeRange orders dates', () => {
    const a = new Date(2024, 11, 31);
    const b = new Date(2024, 0, 1);

    const res = normalizeRange(a, b);
    expect(res).not.toBeNull();
    if (res) {
      expect(res.start.getTime()).toBeLessThanOrEqual(res.end.getTime());
    }
  });
});
