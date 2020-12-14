/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import React from 'react';
import { couponWithDate } from 'TestUtils/Data';
import { renderWithProvider } from 'TestUtils/renderWith';

import EditCourse from '../EditCourse';
import { CourseType } from '../Types';

const testCourseWithoutCoupon: CourseType = {
  id: 1,
  name: 'Course 1',
  link: 'https://udemy.com/awesomecourse',
  description: 'Purr get my claw stuck in the dog\'s ear. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox. Making bread on the bathrobe suddenly go on wild-eyed crazy rampage. ',
  imageName: 'udemy-course-image.jpg',
  coupons: [],
};

const testCourseWithCoupon: CourseType = {
  ...testCourseWithoutCoupon, bestCoupon: couponWithDate, coupons: [couponWithDate],
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

describe('add coupon for course with existing coupons', () => {
  const initialState = { user: { id: 1, username: 'sheila' } };
  test('flow to add and delete new coupon', async () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />, initialState,
    );
    // wait until coupon form shows
    // TODO: find by role and not test ID.
    const couponForms = await addButtonScreen.findAllByTestId(/coupon-[-\d]+-form/);
    expect(couponForms).toHaveLength(1);

    // find and click add button
    const addButton = addButtonScreen.getByRole('button', { name: /add coupon/i });
    fireEvent.click(addButton);

    // check that new coupon appeared
    const couponFormsPlusOne = await addButtonScreen.findAllByTestId(/coupon-[-\d]+-form/);
    expect(couponFormsPlusOne.length).toBe(2);

    // 'add' button should still be there
    const stillAddButton = addButtonScreen.getByRole('button', { name: /add coupon/i });
    expect(stillAddButton).toBeInTheDocument();

    // delete coupon (new coupon should have id -2, since it's 0 - (length of existing list plus 1))
    const deleteNewcourseButton = addButtonScreen.getByRole('button', { name: /delete coupon -2/i });
    fireEvent.click(deleteNewcourseButton);

    // click delete confirmation
    const confirmButton = addButtonScreen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    // check that coupon no longer appears
    const couponFormsMinusOne = await addButtonScreen.findAllByTestId(/coupon-[-\d]+-form/);
    expect(couponFormsMinusOne.length).toBe(1);
  });

  test('flow to delete existing coupon', async () => {
  // render with pre-defined state for user
    const deleteCouponScreen = renderWithProvider(
      <EditCourse {...editCourseWithCouponProps} />, initialState,
    );
    // wait for coupon form
      // TODO: find by role and not test ID.
    await deleteCouponScreen.findByTestId(/coupon-1-form/);
    const deleteButton = await deleteCouponScreen.findByRole('button', { name: /delete coupon 1/i });
    fireEvent.click(deleteButton);

    // click delete confirmation
    const confirmButton = deleteCouponScreen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    // there should be no coupons
    const notCouponForm = deleteCouponScreen.queryByTestId(/coupon-1-form/);
    expect(notCouponForm).not.toBeInTheDocument();
  });
});
