import { fireEvent } from '@testing-library/react';

test.todo('do a test');
// /* eslint-disable react/jsx-props-no-spreading */
// import React from 'react';
// import { testCourseData } from 'TestUtils/Data';
// import { renderWithProvider } from 'TestUtils/renderWith';

// import EditReviewQuote from '../_old_EditReviewQuote';

// const testReviewQuoteData = {
//   courseName: 'Course for review quote',
//   courseLink: 'http://link.for.review.quote.com',
//   id: 5,
//   body: 'Whatta course!',
// };

// const editReviewQuoteProps = {
//   reviewQuoteData: testReviewQuoteData,
//   courses: testCourseData,
//   deleteReviewQuoteFromState: jest.fn(),
//   setAddButton: jest.fn(),
//   reviewQuoteIndex: 1,
// };

// describe('Test form render details for individual quote', () => {
//   test('renders quote form', () => {
//     const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);
//     const quoteForm = screen.getByRole('form', { name: /review quote \d+/i });
//     expect(quoteForm).toBeInTheDocument();
//   });

//   test('renders quote body field', () => {
//     const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);

//     const quoteBodyField = screen.getByRole('textbox', { name: 'Quote' });
//     expect(quoteBodyField).toBeInTheDocument();
//   });

//   test('renders course dropdown', () => {
//     // NOTE: course dropdown will be populated by testCourseData, which has two courses
//     const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);

//     // check the select options
//     const courseOptions = screen.getAllByRole('option', { name: /course \d/i });
//     expect(courseOptions).toHaveLength(2);
//   });

//   test('renders update button', () => {
//     const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);
//     const updateButton = screen.getByRole('button', { name: /update review quote \d+/i });
//     expect(updateButton).toBeInTheDocument();
//   });

//   test('renders delete button', () => {
//     const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);
//     const deleteButton = screen.getByRole('button', { name: /delete review quote \d+/i });
//     expect(deleteButton).toBeInTheDocument();
//   });
// });
