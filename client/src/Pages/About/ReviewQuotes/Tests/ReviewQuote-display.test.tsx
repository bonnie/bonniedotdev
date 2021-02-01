import { render, screen } from '@testing-library/react';
import React from 'react';

import ReviewQuote from '../ReviewQuote';
import { ReviewQuoteType } from '../Types';

const reviewQuoteData: ReviewQuoteType = {
  id: 5,
  body: 'Cat mojo stretch out on bed yet mrow chew iPad power cord sit on human, but i like big cats and i can not lie rub face on everything. Love blinks and purr purr purr purr yawn pet my belly, you know you want to;',
  courseId: 3,
  courseName: 'Coursey Course',
  courseLink: 'http://udemy.com/react-testing-library',
};

test('All data displays for ReviewQuote', () => {
  render(<ReviewQuote reviewQuoteData={reviewQuoteData} editButtons={null} />);

  const body = screen.getByText(/i like big cats and i can not lie/i);
  expect(body).toBeInTheDocument();

  const courseLink = screen.getByRole('link', { name: /coursey course/i });
  expect(courseLink).toBeInTheDocument();
  expect(courseLink).toHaveAttribute('href', 'http://udemy.com/react-testing-library');
});
