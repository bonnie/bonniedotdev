/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-props-no-spreading */
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

import EditCoupon from '../EditCoupon';

const couponData = {
  id: 1,
  code: 'NOT_EXPIRED',
  link: 'http://link',
  price: 12.99,
  utcExpirationISO: '2020-11-17T20:01:03.182265+00:00',
};

const editCouponProps = {
  couponData,
  updateCoupon: jest.fn(),
  deleteCoupon: jest.fn(),
};

describe('Test form render details for read-only coupon', () => {
  const ui = (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <EditCoupon {...editCouponProps} />
    </MuiPickersUtilsProvider>
  );

  test('renders coupon code and date text fields', () => {
    const screen = renderWithProvider(ui);

    // TODO: having trouble getting by label because MaterialUI swallows my aria-label
    // and doesn't present the form label in an accessible way :-/
    const couponTextFields = screen.getAllByRole('textbox');
    expect(couponTextFields[0]).toHaveValue('NOT_EXPIRED');
    expect(couponTextFields[1]).toHaveValue('Nov 17 2020, 12:01');
  });

  test('renders coupon price field as number field', () => {
    const screen = renderWithProvider(ui);

    const couponPriceField = screen.getByRole('spinbutton');
    expect(couponPriceField).toHaveValue(12.99);
  });

  // coupon doesn't have an update button b/c it only gets sent to the server
  // when the whole course gets updated
  test('does not render update button', () => {
    const screen = renderWithProvider(ui);
    const deleteButton = screen.queryByRole('button', { name: /update coupon \d+/i });
    expect(deleteButton).not.toBeInTheDocument();
  });

  test('renders delete button', () => {
    const screen = renderWithProvider(ui);
    const deleteButton = screen.getByRole('button', { name: /delete coupon \d+/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
