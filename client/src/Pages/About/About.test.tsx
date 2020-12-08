/* eslint-disable max-lines-per-function */
import React from 'react';

import { renderWithProvider } from '../../TestUtils/renderWith';
import About from './About';

test('renders bio', () => {
  const screen = renderWithProvider(<About />);
  const bioTitle = screen.getByRole('heading', { name: 'About Bonnie' });
  expect(bioTitle).toBeInTheDocument();
});

test('renders review quotes title', () => {
  const screen = renderWithProvider(<About />);
  const quotesTitle = screen.getByRole('heading', { name: /students say/i });
  expect(quotesTitle).toBeInTheDocument();
});
