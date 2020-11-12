import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

const courseInfo = {
  title: 'React Testing with Jest and Enzyme',
};

test.skip('renders course title', () => {
  render(<About />);
  const courseTitle = screen.getByRole('accordian', { name: courseInfo.title });
  expect(courseTitle).toBeInTheDocument();
});
