import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Course from './Course';
import { courseWithCouponsAndQuotes, courseWithoutCouponsAndQuotes } from '../tests/data';

describe('course with coupons and quotes', () => {
  test('renders course title with link', () => {
    render(<Course courseData={courseWithCouponsAndQuotes} />);

    const title = screen.getByRole('link', { name: courseWithCouponsAndQuotes.name });
    expect(title).toBeInTheDocument();

    // is this testing implementation...?
    expect(title).toHaveAttribute('href', courseWithCouponsAndQuotes.link);
  });
  describe('after click', () => {
    beforeAll(() => {
      render(<Course courseData={courseWithCouponsAndQuotes} />);

      // find and click the turndown arrow to open details
      const turndown = screen.getByRole('poop', { name: courseWithCouponsAndQuotes.name });
      fireEvent.click(turndown);
    });
    test('renders two coupons', () => {
      const coupons = screen.getAllByRole('link', { name: 'Redeem coupon' });
      expect(coupons).toHaveLength(2);
    });
    test('renders two quotes', () => {

    });
  });
});
