import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('it starts at the home page', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { name: /Bonnie Schulkin/ });
  expect(linkElement).toBeInTheDocument();
});
