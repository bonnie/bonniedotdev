import React from 'react';
import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

describe('render buttons', () => {
  beforeEach(() => {
    render(<SocialLinks />);
  });

  test('render twitter button', () => {
    const twitterLink = screen.getByRole('link', { name: 'twitter' });
    expect(twitterLink).toBeInTheDocument();
  });

  test('render linkedIn button', () => {
    const linkedInLink = screen.getByRole('link', { name: 'linked-in' });
    expect(linkedInLink).toBeInTheDocument();
  });

  test('render github button', () => {
    const githubLink = screen.getByRole('link', { name: 'github' });
    expect(githubLink).toBeInTheDocument();
  });
});
