/* eslint-disable max-lines-per-function */
import React from 'react';

import { renderWithProvider } from '../../testUtils/renderWith';
import About from './About';

test('renders bio', () => {
  const screen = renderWithProvider(<About />);
  const bioTitle = screen.getByRole('heading', { name: 'About Bonnie' });
  expect(bioTitle).toBeInTheDocument();
});
