import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders my name', () => {
  render(<Home />);
  const linkElement = screen.getByRole('heading', { name: /Bonnie Schulkin/ });
  expect(linkElement).toBeInTheDocument();
});
