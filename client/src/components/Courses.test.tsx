import React from 'react';
import { render, screen } from '@testing-library/react';
import Courses from './Courses';

// mock network calls
jest.mock('../axios');

test('renders courses', () => {
  render(<Courses />);
});
