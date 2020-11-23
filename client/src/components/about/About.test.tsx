import { render, screen } from '@testing-library/react';
import React from 'react';

import About from './About';

// TODO: mock actions once actions are saga-ified

test('renders bio', () => {
  render(<About />);
  const bioTitle = screen.getByRole('heading', { name: 'About Bonnie' });
  expect(bioTitle).toBeInTheDocument();
});

test('renders quotes', () => {
  render(<About />);
  const quotesTitle = screen.getByRole('heading', { name: 'Students say...' });
  expect(quotesTitle).toBeInTheDocument();
});
