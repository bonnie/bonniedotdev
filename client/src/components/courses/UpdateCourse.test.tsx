import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import UpdateCourse from './UpdateCourse';

test.skip('some test here', () => {
  const courseData = {};
  render(<UpdateCourse courseData={courseData} />);
});
