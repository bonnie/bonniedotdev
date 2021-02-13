import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';
import { Coupon as CouponType } from 'Types';

import Coupon from '../Coupon';

const couponData: CouponType = {
  id: 4,
  price: 9.99,
  courseId: 5,
  link: 'http://rickroll.com?9.99',
  utcExpirationISO: '2099-02-04T00:00:00',
};

test('renders coupon price with link', () => {
  const screen = renderWithProvider(
    <Coupon couponData={couponData} courseId={1} />,
  );

  const couponPrice = screen.getByRole('link', { name: '9.99' });
  expect(couponPrice).toHaveAttribute('href', 'http://rickroll.com?9.99');
});

test('renders coupon expiration', () => {
  const screen = renderWithProvider(
    <Coupon couponData={couponData} courseId={1} />,
  );

  const expirationText = screen.getByText(/expires/i);
  expect(expirationText).toBeInTheDocument();
});
