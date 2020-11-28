import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import EditCourse from './EditCourse';

test.skip('some test here', () => {
  const courseData = {};
  render(<EditCourse courseData={courseData} />);
});
