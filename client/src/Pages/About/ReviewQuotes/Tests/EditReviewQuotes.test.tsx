/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { testCourseData } from 'TestUtils/Data';
import { renderWithProvider } from 'TestUtils/renderWith';

import EditReviewQuote from '../EditReviewQuote';

const testReviewQuoteData = {
  courseName: 'Course for review quote',
  courseLink: 'http://link.for.review.quote.com',
  id: 5,
  body: 'Whatta course!',
};

const editReviewQuoteProps = {
  reviewQuoteData: testReviewQuoteData,
  courses: testCourseData,
  deleteReviewQuoteFromState: jest.fn(),
  setAddButton: jest.fn(),
  reviewQuoteIndex: 1,
};

describe.only('Test form render details for individual quote', () => {
  test('renders quote form', () => {
    const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);
    const quoteForm = screen.getByRole('form', { name: /review quote \d+/i });
    expect(quoteForm).toBeInTheDocument();
  });

  test('renders quote body fields', () => {
    const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);

    const quoteBodyField = screen.getByRole('textbox', { name: 'Quote' });
    expect(quoteBodyField).toBeInTheDocument();
  });

  test('renders course dropdowns', () => {
    // NOTE: course dropdown will be populated by testCourseData, which has two courses
    const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);

    // check for course dropdown (select has role "button")
    const courseSelect = screen.getByRole('button', { name: /Course\s*/ });
    expect(courseSelect).toBeInTheDocument();

    // TODO: check for the actual select
  });

  test('renders update buttons', () => {
    const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);
    const updateButton = screen.getByRole('button', { name: /update review quote \d+/i });
    expect(updateButton).toBeInTheDocument();
  });

  test('renders delete buttons', () => {
    const screen = renderWithProvider(<EditReviewQuote {...editReviewQuoteProps} />);
    const deleteButton = screen.getByRole('button', { name: /delete review quote \d+/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
