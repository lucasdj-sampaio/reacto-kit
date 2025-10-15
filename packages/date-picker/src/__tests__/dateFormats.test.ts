/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import {
  formatDateToString,
  parseDateFromString,
  toDateSafe,
} from '../util/dateFormats';

describe('dateFormats', () => {
  it('parseDateFromString - en', () => {
    const d = parseDateFromString('12/31/2024', 'en');
    expect(d).not.toBeNull();
    expect(formatDateToString(d as Date, 'en')).toBe('12/31/2024');
  });

  it('parseDateFromString - pt', () => {
    const d = parseDateFromString('31/12/2024', 'pt');
    expect(d).not.toBeNull();
    expect(formatDateToString(d as Date, 'pt')).toBe('31/12/2024');
  });

  it('toDateSafe - iso fallback', () => {
    const d = toDateSafe('2024-12-31', 'en');
    expect(d).not.toBeNull();
    expect((d as Date).getFullYear()).toBe(2024);
  });
});
