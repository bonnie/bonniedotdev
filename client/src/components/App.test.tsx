import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders my name', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { name: /Bonnie Schulkin/ });
  expect(linkElement).toBeInTheDocument();
});
