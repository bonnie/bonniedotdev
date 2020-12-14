import { render, screen } from '@testing-library/react';
import React from 'react';

import PageNotFound from '../PageNotFound';

test('not found page has image', () => {
  render(<PageNotFound />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('not found page has oops message', () => {
  render(<PageNotFound />);
  expect(screen.getByText(/oops/i)).toBeInTheDocument();
});
