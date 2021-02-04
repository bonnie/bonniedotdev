/* eslint-disable max-lines-per-function */
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import userEvent from '@testing-library/user-event';
import Course from 'Pages/Courses/Course';
import { CourseType } from 'Pages/Courses/Types';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

import { CouponType } from '../Types';

const coupons: CouponType[] = [
  {
    id: 4,
    price: 9.99,
    courseId: 5,
    link: 'rickroll.com?9.99',
    utcExpirationISO: '2099-02-04T00:00:00',
  },
  {
    id: 8,
    price: 19.99,
    courseId: 5,
    link: 'rickroll.com?19.11',
    utcExpirationISO: '2038-02-04T00:00:00',
  },
];

const courseData: CourseType = {
  id: 5,
  name: 'Coursey course',
  description: 'i am the coursiest of courses',
  link: 'http://coursey.course.com',
  imageName: 'coursey.png',
  bestCoupon: coupons[0],
  coupons,
};

// editbuttons is used to determine whether there's a logged-in user
const courseWithMuiDateProvider = (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Course courseData={courseData} editButtons={<div />} />
  </MuiPickersUtilsProvider>
);

test('create new coupon and save', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const newCouponScreen = renderWithProvider(
    courseWithMuiDateProvider,
    initialState,
  );

  // wait until Course edit buttons appear so we know data is loaded
  const editButtons = await newCouponScreen.findAllByRole('button', {
    name: /edit coupon/i,
  });
  expect(editButtons.length).toBe(2);

  // find and click add button
  const addButton = newCouponScreen.getByRole('button', {
    name: /add coupon/i,
  });
  userEvent.click(addButton);

  // wait for new coupon modal to show
  const couponModalTitle = await newCouponScreen.findByRole('heading', {
    name: /add coupon/i,
  });
  expect(couponModalTitle).toBeVisible();

  // add (somewhat bogus) text data
  let fieldElement;
  ['link', 'price']
    // eslint-disable-next-line array-callback-return
    .map((fieldName) => {
      fieldElement = newCouponScreen.getByRole('textbox', { name: fieldName });
      userEvent.clear(fieldElement);
      userEvent.type(fieldElement, fieldName);
      expect(fieldElement).toHaveValue(fieldName);
    });

  // click button to save new Course
  const saveButton = newCouponScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  // expect the modal to be hidden
  expect(couponModalTitle).not.toBeVisible();
});

test('update a coupon', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const editCouponScreen = renderWithProvider(
    courseWithMuiDateProvider,
    initialState,
  );
  // wait until Course edit buttons appear so we know data is loaded
  const editButtons = await editCouponScreen.findAllByRole('button', {
    name: /edit coupon/i,
  });
  expect(editButtons.length).toBe(2);

  // click the first edit button
  const firstEditButton = editButtons[0];
  userEvent.click(firstEditButton);

  // check that we have the modal with the expected title
  const modalTitle = editCouponScreen.getByRole('heading', {
    name: /edit coupon/i,
  });
  expect(modalTitle).toBeVisible();

  // update content and confirm update
  const priceField = editCouponScreen.getByRole('textbox', {
    name: 'price',
  });
  userEvent.clear(priceField);
  userEvent.type(priceField, '14.88');

  // click save button
  const saveButton = editCouponScreen.getByRole('button', { name: /save/i });
  userEvent.click(saveButton);

  // check that the modal closes
  // (there is no "server database" to update with the new Course content in this test)
  expect(modalTitle).not.toBeVisible();
});

test('delete a coupon', async () => {
  // TODO: why does this cause "Error: Error: connect ECONNREFUSED 127.0.0.1:80" when
  // run in parallel with the other tests, even though all tests pass?
  // Commenting this '.skip' or '.only' makes the warning go away T.T
  // AND: why does this error not appear with the notLoggedIn test file??
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // END: todo

  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const deleteCouponScreen = renderWithProvider(
    courseWithMuiDateProvider,
    initialState,
  );
  // wait until Course delete buttons appear so we know data is loaded
  const deleteButtons = await deleteCouponScreen.findAllByRole('button', {
    name: /delete coupon/i,
  });
  expect(deleteButtons.length).toBe(2);

  // click the first delete button, which should be associated with the Course
  const firstDeleteButton = deleteButtons[0];
  userEvent.click(firstDeleteButton);

  // check that we have the modal with the expected title
  const modalTitle = deleteCouponScreen.getByRole('heading', {
    name: /^Are you sure you want to delete/i,
  });
  expect(modalTitle).toBeVisible();

  // click confirm on modal
  const confirmButton = deleteCouponScreen.getByRole('button', {
    name: 'Confirm',
  });
  userEvent.click(confirmButton);

  // confirm modal has disappeared (note, Course will not be deleted
  // because the handler information has not changed)
  expect(modalTitle).not.toBeVisible();
});
