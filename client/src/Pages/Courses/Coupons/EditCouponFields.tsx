/* eslint-disable max-lines-per-function */
import moment from 'moment';
import DateTimeInput from 'Pages/Common/Inputs/DateTimeInput';
import LinkInput from 'Pages/Common/Inputs/LinkInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement, useState } from 'react';
import { Coupon as CouponType, NewCoupon } from 'Types';

const newCoupon: NewCoupon = {
  price: 9.99,
  link: '',
  utcExpirationISO: moment(new Date()).toString(),
};

interface EditCouponFieldsType {
  couponData?: CouponType | NewCoupon;
  courseId: number;
}

EditCouponFields.defaultProps = { couponData: newCoupon };

export default function EditCouponFields(
  // courseId will always come in as a prop -- no editing/adding coupons
  // independent of a course
  { couponData = newCoupon, courseId }: EditCouponFieldsType,
): ReactElement {
  const [expirationDate, setExpirationDate] = useState(
    couponData.utcExpirationISO,
  );

  return (
    <>
      <TextInput
        required
        fieldName="price"
        defaultValue={couponData.price.toString()}
      />

      <DateTimeInput
        fieldName="utcExpirationISO"
        value={expirationDate}
        label="Expiration date (local time)"
        dateSetter={setExpirationDate}
      />
      <LinkInput required fieldName="link" defaultValue={couponData.link} />
      <input type="hidden" name="courseId" value={courseId} />
    </>
  );
}
