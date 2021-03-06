import { render, screen } from '@testing-library/react';
import React from 'react';

import SocialLinks from '../SocialLinks';

test.each([['Twitter'], ['GitHub'], ['Medium'], ['LinkedIn']])(
  '%i icon',
  (iconName) => {
    render(<SocialLinks />);

    const iconLink = screen.getByRole('link', { name: iconName });
    expect(iconLink).toBeInTheDocument();
  },
);
