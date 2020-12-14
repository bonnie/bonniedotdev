import { render, screen } from '@testing-library/react';
import { url } from 'inspector';
import React from 'react';

import Course from '../Course';
import { CouponType, CourseType } from '../Types/index';

const coupon: CouponType = {
  id: 1,
  code: 'COUPON_CODE',
  price: 12.99,
  utcExpirationISO: new Date('2020-11-17T20:01:03.182265+00:00').toISOString(),
};

const courseWithoutCoupon: CourseType = {
  id: 1,
  name: 'Course Title',
  link: 'http://test-link',
  description: 'course description',
  imageName: 'image.png',
};
const courseWithCoupon: CourseType = {
  ...courseWithoutCoupon,
  bestCoupon: coupon,
};

describe('course with coupon', () => {
  test('renders course image', () => {
    render(<Course courseData={courseWithCoupon} />);

    // check that correct image is showing
    const courseImage = screen.getByTitle('Course Image');
    expect(courseImage).toHaveStyle({ backgroundImage: url('/images/course-images/img.png') });
  });
  test('renders course title with link', () => {
    render(<Course courseData={courseWithCoupon} />);

    // use regex because the link includes the title and the description
    const title = screen.getByRole('link', { name: /Course Title/ });
    expect(title).toHaveAttribute('href', 'http://test-link');
  });
  test('renders link with coupon price', () => {
    render(<Course courseData={courseWithCoupon} />);

    const couponText = screen.getByRole('link', { name: /12.99/ });
    expect(couponText).toHaveAttribute('href', 'http://test-link?couponCode=COUPON_CODE');
  });

  test('renders coupon expiration text', () => {
    render(<Course courseData={courseWithCoupon} />);

    const expirationText = screen.getByText(/expires/i);
    expect(expirationText).toBeInTheDocument();
  });
});

describe('course without coupon', () => {
  test('renders course image', () => {
    render(<Course courseData={courseWithCoupon} />);

    // check that correct image is showing
    const courseImage = screen.getByTitle('Course Image');
    expect(courseImage).toHaveStyle({ backgroundImage: url('/images/course-images/img.png') });
  });
  test('renders course title with link', () => {
    render(<Course courseData={courseWithCoupon} />);

    // use regex because the link includes the title and the description
    const title = screen.getByRole('link', { name: /Course Title/ });
    expect(title).toHaveAttribute('href', 'http://test-link');
  });
});
