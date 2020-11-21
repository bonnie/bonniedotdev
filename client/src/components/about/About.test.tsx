import { render, screen } from '@testing-library/react';
import React from 'react';

import About from './About';

test('renders description', () => {
  render(<About />);
});
