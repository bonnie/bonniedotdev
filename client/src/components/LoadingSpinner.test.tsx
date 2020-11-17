import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

test('Loading spinner is hidden when open prop is false', () => {
  render(<LoadingSpinner open={false} />);
  // use `queryBy` to avoid throwing an error with `getBy`
  // https://testing-library.com/docs/guide-disappearance/

  // annoyingly, the backdrop has attribute "aria-hidden" whether or not it's
  // showing
  const spinner = screen.queryByRole('progressbar', { hidden: true });
  expect(spinner).not.toBeVisible();
});

test('Loading spinner is shown when open prop is true', () => {
  render(<LoadingSpinner open />);

  // annoyingly, the backdrop has attribute "aria-hidden" whether or not it's
  // showing
  const spinner = screen.getByRole('progressbar', { hidden: true });
  expect(spinner).toBeVisible();
});
