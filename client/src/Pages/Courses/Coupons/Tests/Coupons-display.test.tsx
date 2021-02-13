import Course from 'Pages/Courses/Course';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';
import { Coupon as CouponType, Course as CourseType } from 'Types';

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

test('Renders only best coupon', async () => {
  const screen = renderWithProvider(<Course courseData={courseData} />);

  // expect only one "expires" statement
  const couponExpires = screen.getByText(/expires/i);
  expect(couponExpires).toBeInTheDocument();

  // expect only 9.99 text
  const nineNinetyNine = screen.getByRole('link', { name: /9\.99/ });
  expect(nineNinetyNine).toBeInTheDocument();

  // expect not to see 19.11 text
  const ninteenEleven = screen.queryByRole('link', { name: /19\.11/ });
  expect(ninteenEleven).not.toBeInTheDocument();
});
