import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';

import Routes from './Routes';

it('navigates to About', () => {
  render(<MemoryRouter><Routes /></MemoryRouter>);

  // Interact with page
  const aboutLink = screen.getByRole('tab', { name: 'about' });
  fireEvent.click(aboutLink);

  // check correct page showed up
  const headline = screen.getByRole('heading', { name: 'About' });
  expect(headline).toBeInTheDocument();
});
