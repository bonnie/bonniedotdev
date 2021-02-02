import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '../Home';

describe('page elements', () => {
  beforeEach(() => {
    render(<Home />);
  });
  test('renders my name', () => {
    // use exact string for name when the aria-label contains only the search term
    const linkElement = screen.getByRole('heading', {
      name: 'Bonnie Schulkin',
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders social media buttons', () => {
    // use regex for name when the aria-label contains more than the search term
    const socialMediaButtons = screen.getByRole('group', {
      name: /social-media/,
    });
    expect(socialMediaButtons).toBeInTheDocument();
  });
});
