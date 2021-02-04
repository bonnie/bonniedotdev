import { render, screen } from '@testing-library/react';
import React from 'react';

import Coupon from '../Coupon';
import { CouponType } from '../Types';

const couponData: CouponType = {
  id: 4,
  price: 9.99,
  courseId: 5,
  link: 'http://rickroll.com?9.99',
  utcExpirationISO: '2099-02-04T00:00:00',
};

test('renders coupon price with link', () => {
  render(<Coupon couponData={couponData} editButtons={null} />);

  const couponPrice = screen.getByRole('link', { name: '9.99' });
  expect(couponPrice).toHaveAttribute('href', 'http://rickroll.com?9.99');
});

test('renders coupon expiration', () => {
  render(<Coupon couponData={couponData} editButtons={null} />);

  const expirationText = screen.getByText(/expires/i);
  expect(expirationText).toBeInTheDocument();
});
