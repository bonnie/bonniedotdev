import { render, screen } from '@testing-library/react';
import React from 'react';

import SocialLinks from '../SocialLinks';

test('render twitter button', () => {
  render(<SocialLinks />);
  const twitterLink = screen.getByRole('link', { name: 'twitter' });
  expect(twitterLink).toBeInTheDocument();
});

test('render linkedIn button', () => {
  render(<SocialLinks />);
  const linkedInLink = screen.getByRole('link', { name: 'linked-in' });
  expect(linkedInLink).toBeInTheDocument();
});

test('render github button', () => {
  render(<SocialLinks />);
  const githubLink = screen.getByRole('link', { name: 'github' });
  expect(githubLink).toBeInTheDocument();
});
