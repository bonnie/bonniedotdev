import React from 'react';
import { render, screen } from '@testing-library/react';
import Course from './Course';
import { courseWithCouponsAndQuotes, courseWithoutCouponsAndQuotes } from '../tests/data';

test('renders course title', () => {
  render(<Course data={courseWithCouponsAndQuotes} />);
});
