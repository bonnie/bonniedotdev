import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

test('renders description', () => {
  render(<About />);
});
