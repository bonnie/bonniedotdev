/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { couponWithDate } from 'TestUtils/Data';
import { renderWithProvider } from 'TestUtils/renderWith';

import EditCourse from '../_EditCourse';
import { CourseType } from '../Types';

const testCourseWithoutCoupon: CourseType = {
  id: 1,
  name: 'Course 1',
  link: 'https://udemy.com/awesomecourse',
  description:
    "Purr get my claw stuck in the dog's ear. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox. Making bread on the bathrobe suddenly go on wild-eyed crazy rampage. ",
  imageName: 'udemy-course-image.jpg',
  coupons: [],
};

const testCourseWithCoupon: CourseType = {
  ...testCourseWithoutCoupon,
  bestCoupon: couponWithDate,
  coupons: [couponWithDate],
};

const editCourseWithoutCouponProps = {
  courseData: testCourseWithoutCoupon,
  deleteCourseFromState: jest.fn(),
  courseIndex: 1,
};

const editCourseWithCouponProps = {
  courseData: testCourseWithCoupon,
  deleteCourseFromState: jest.fn(),
  courseIndex: 1,
};

describe('Test form render details for course with coupon', () => {
  test('renders course form', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );
    const courseForm = screen.getByRole('form', { name: /course \d+/i });
    expect(courseForm).toBeInTheDocument();
  });

  test('renders course title field', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );

    const courseTitleField = screen.getByText('Course 1');
    expect(courseTitleField).toBeRequired();
  });

  test('renders course description field', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );

    const courseDescriptionField = screen.getByText(
      /fluff everywhere meow miao/,
    );
    expect(courseDescriptionField).toBeRequired();
  });

  test('renders course link field', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );

    const courseLinkField = screen.getByText('https://udemy.com/awesomecourse');
    expect(courseLinkField).toBeRequired();
  });

  test('renders coupons', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );

    // note: coupon component content details tested in EditCoupon.test.tsx
    const updateCouponButtons = screen.getAllByRole('button', {
      name: /delete coupon \d+/i,
    });
    expect(updateCouponButtons).toHaveLength(1);
  });

  test('renders update button', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );
    const updateButton = screen.getByRole('button', {
      name: /update course \d+/i,
    });
    expect(updateButton).toBeInTheDocument();
  });

  test('renders delete button', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /delete course \d+/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });
});

describe('Test form render details for course without coupon', () => {
  test('renders course form', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );
    const courseForm = screen.getByRole('form', { name: /course \d+/i });
    expect(courseForm).toBeInTheDocument();
  });

  test('renders course title field', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );

    const courseTitleField = screen.getByText('Course 1');
    expect(courseTitleField).toBeRequired();
  });

  test('renders course description field', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );

    const courseDescriptionField = screen.getByText(
      /fluff everywhere meow miao/,
    );
    expect(courseDescriptionField).toBeRequired();
  });

  test('renders course link field', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );

    const courseLinkField = screen.getByText('https://udemy.com/awesomecourse');
    expect(courseLinkField).toBeRequired();
  });

  test('renders no coupons', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );

    const updateCouponButtons = screen.queryAllByRole('button', {
      name: /delete coupon \d+/i,
    });
    expect(updateCouponButtons).toHaveLength(0);
  });

  test('renders update button', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );
    const updateButton = screen.getByRole('button', {
      name: /update course \d+/i,
    });
    expect(updateButton).toBeInTheDocument();
  });

  test('renders delete button', () => {
    const screen = renderWithProvider(
      <EditCourse {...editCourseWithoutCouponProps} />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /delete course \d+/i,
    });
    expect(deleteButton).toBeInTheDocument();
  });
});
