import { url } from 'inspector';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';
import { Coupon as CouponType, Course as CourseType } from 'Types';

import Course from '../Course';

const coupons: CouponType[] = [
  {
    id: 4,
    price: 9.99,
    courseId: 5,
    link: 'http://rickroll.com?9.99',
    utcExpirationISO: '2099-02-04T00:00:00',
  },
  {
    id: 4,
    price: 19.99,
    courseId: 5,
    link: 'http://rickroll.com?19.99',
    utcExpirationISO: '2038-02-04T00:00:00',
  },
];

const courseWithoutCoupons: CourseType = {
  id: 5,
  name: 'Coursey course',
  description: 'i am the coursiest of courses',
  link: 'http://coursey.course.com',
  imageName: 'coursey.png',
};

const courseWithCoupons: CourseType = {
  ...courseWithoutCoupons,
  bestCoupon: coupons[0],
  coupons,
};

describe('course with coupon', () => {
  test('renders course image', () => {
    const screen = renderWithProvider(
      <Course courseData={courseWithCoupons} />,
    );

    // check that correct image is showing
    const courseImage = screen.getByTitle('Course Image');
    expect(courseImage).toHaveStyle({
      backgroundImage: url('/static/images/courses/coursey.png'),
    });
  });
  test('renders course title with link', () => {
    const screen = renderWithProvider(
      <Course courseData={courseWithCoupons} />,
    );

    // use regex because the link includes the title and the description
    const title = screen.getByRole('link', { name: /Coursey course/i });
    expect(title).toHaveAttribute('href', 'http://coursey.course.com');
  });
  test('renders link with coupon price', () => {
    const screen = renderWithProvider(
      <Course courseData={courseWithCoupons} />,
    );

    const couponText = screen.getByRole('link', { name: /9.99/ });
    expect(couponText).toHaveAttribute('href', 'http://rickroll.com?9.99');
  });

  test('renders coupon expiration text', () => {
    const screen = renderWithProvider(
      <Course courseData={courseWithCoupons} />,
    );

    const expirationText = screen.getByText(/expires/i);
    expect(expirationText).toBeInTheDocument();
  });
});

describe('course without coupon', () => {
  test('renders course image', () => {
    const screen = renderWithProvider(
      <Course courseData={courseWithCoupons} />,
    );

    // check that correct image is showing
    const courseImage = screen.getByTitle('Course Image');
    expect(courseImage).toHaveStyle({
      backgroundImage: url('/static/images/courses/coursey.png'),
    });
  });
  test('renders course title with link', () => {
    const screen = renderWithProvider(
      <Course courseData={courseWithCoupons} />,
    );

    // use regex because the link includes the title and the description
    const title = screen.getByRole('link', { name: /Coursey Course/i });
    expect(title).toHaveAttribute('href', 'http://coursey.course.com');
  });
});
