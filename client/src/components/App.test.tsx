import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('it starts at the home page', () => {
  render(<App />);
  const nameHeading = screen.getByRole('heading', { name: 'Bonnie Schulkin' });
  expect(nameHeading).toBeInTheDocument();
});

describe('page contains all nav links', () => {
  beforeEach(() => {
    render(<App />);
  });
  test('it has a tab for About', () => {
    const aboutLink = screen.getByRole('tab', { name: 'about' });
    expect(aboutLink).toBeInTheDocument();
  });
});
