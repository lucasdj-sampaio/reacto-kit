/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Calendar } from '../components/calendar';

describe('Calendar', () => {
  it('marks selected day as active', () => {
    const selected = ['10/9/2025'];

    render(<Calendar selectedDate={selected} language="en" />);

    const button = screen.getByText('9');
    expect(button).toBeTruthy();
    expect(
      button.className.includes('bg-blue-500') ||
        button.className.includes('text-white')
    ).toBe(true);
  });
});
