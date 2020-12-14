import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import EditButtons from 'Pages/Common/EditButtons';
import React, { ReactElement } from 'react';

import { CouponType } from './Types';

interface EditCouponProps {
  couponData: CouponType,
  deleteCoupon: (number) => void
  updateCoupon: (property: string, value: string | Date, couponId: number) => void
}

// eslint-disable-next-line max-lines-per-function
export default function EditCoupon(
  { couponData, deleteCoupon, updateCoupon }: EditCouponProps,
): ReactElement {
  const couponId = couponData.id;

  const handleChange = (property, value) => {
    // TODO: debounce
    if (couponId) {
      updateCoupon(property, value, couponId);
    } else {
      // TODO: log to file
      console.error('Coupon without ID', couponData);
    }
  };

  const itemLabel = `Coupon ${couponId}`;

  return (
    <Box m={2}>
      <Input type="hidden" name="id" value={couponId} />
      <TextField
        required
        type="text"
        name="code"
        value={couponData.code}
        label="Code"
        aria-label={`${itemLabel} code`}
        onChange={(event) => handleChange('code', event.target.value)}
      />
      <TextField
        required
        type="number"
        name="price"
        value={couponData.price}
        label="Price"
        aria-label={`${itemLabel} price`}
        onChange={(event) => handleChange('price', event.target.value)}
      />
      <DateTimePicker
        aria-label={`${itemLabel} date`}
        value={couponData.utcExpirationISO}
        onChange={(value) => handleChange('utcExpirationISO', value)}
        label="Expiration date (local time)"
        format="MMM dd Y, H:mm"
        style={{ width: '100%' }}
      />
      <EditButtons
        itemString="coupon"
        updateButton={false}
        handleDelete={() => deleteCoupon(couponId)}
        itemLabel={`Coupon ${couponId}`}
      />
    </Box>
  );
}
