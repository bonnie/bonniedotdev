import React from 'react';
import { render, screen } from '@testing-library/react';
import Courses from './Courses';

test('renders courses', () => {
  render(<Courses />);
});
