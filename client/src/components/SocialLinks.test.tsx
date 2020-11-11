import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

test('renders without error', () => {
  render(<SocialLinks />);
  const linkElement = screen.findByTestId('component-social-links');
  expect(linkElement).toBeInTheDocument();
});
