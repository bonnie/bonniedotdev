import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import EditButtons from 'Pages/Common/EditButtons';
import React, { ReactElement } from 'react';

import { CouponsById } from './EditCourse';

interface EditCouponProps {
  couponId: number,
  coupons: CouponsById,
  setCoupons: (coupons: CouponsById) => void
}

// eslint-disable-next-line max-lines-per-function
export default function EditCoupon(
  { couponId, coupons, setCoupons }: EditCouponProps,
): ReactElement {
  const handleChange = (property, value) => {
    // update state
    // TODO: debounce
    const newCoupons = new Map(coupons);
    const couponData = coupons.get(couponId);
    if (!couponData) {
      // something went wrong if the id is not in the coupons state
      // TODO log error to file
      console.error('found coupon id not in state', couponId);
      return;
    }
    couponData[property] = value;
    newCoupons.set(couponId, couponData);
    setCoupons(newCoupons);
  };

  const handleDelete = () => {
    // remove from coupon state
    const newCoupons = new Map(coupons);
    newCoupons.delete(couponId);
    setCoupons(newCoupons);
  };

  return (
    <Box m={2}>
      <Input type="hidden" name="id" value={couponId} />
      <TextField
        required
        type="text"
        name="code"
        value={coupons.get(couponId)?.code}
        label="Code"
        onChange={(event) => handleChange('code', event.target.value)}
      />
      <TextField
        required
        type="number"
        name="price"
        value={coupons.get(couponId)?.price}
        label="Price"
        onChange={(event) => handleChange('price', event.target.value)}
      />
      <DateTimePicker
        value={coupons.get(couponId)?.utcExpirationISO}
        onChange={(value) => handleChange('utcExpirationISO', value)}
        label="Expiration date (local time)"
        format="MMM dd Y, H:mm"
        style={{ width: '100%' }}
      />
      <EditButtons itemString="coupon" updateButton={false} handleDelete={handleDelete} />
    </Box>
  );
}
