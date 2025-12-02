// src/components/Counter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Counter from './Counter';

test('increments count on button click', () => {
  render(<Counter />);
  const button = screen.getByText(/count is 0/i);
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
});
