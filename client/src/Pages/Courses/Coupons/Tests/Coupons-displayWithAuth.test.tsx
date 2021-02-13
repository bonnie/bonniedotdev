import Course from 'Pages/Courses/Course';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';
import { Coupon, Course as CourseType } from 'Types';

const coupons: Coupon[] = [
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

test('Renders coupon add button', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const coursesScreen = renderWithProvider(
    <Course courseData={courseData} />,
    initialState,
  );

  const addButton = coursesScreen.getByRole('button', { name: /add coupon/i });
  expect(addButton).toBeInTheDocument();
});

test('Renders coupon edit and delete buttons', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const coursesScreen = renderWithProvider(
    <Course courseData={courseData} />,
    initialState,
  );

  // there should be two coupons, so two edit buttons and two delete buttons
  const editButtons = await coursesScreen.findAllByRole('button', {
    name: /edit coupon/i,
  });
  expect(editButtons).toHaveLength(2);

  const deleteButtons = await coursesScreen.findAllByRole('button', {
    name: /delete coupon/i,
  });
  expect(deleteButtons).toHaveLength(2);
});
