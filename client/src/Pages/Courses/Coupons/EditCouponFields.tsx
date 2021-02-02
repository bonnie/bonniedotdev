/* eslint-disable max-lines-per-function */
import DateInput from 'Pages/Common/Inputs/DateInput';
import LinkInput from 'Pages/Common/Inputs/LinkInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement, useState } from 'react';

import { CouponType } from './Types';

const newCoupon: CouponType = {
  price: 9.99,
  link: '',
  utcExpirationISO: '',
};

interface EditCouponFieldsType {
  couponData?: CouponType,
  courseId: number,
}

EditCouponFields.defaultProps = { couponData: newCoupon };

export default function EditCouponFields(
  // courseId will always come in as a prop -- no editing/adding coupons
  // independent of a course
  { couponData = newCoupon, courseId }: EditCouponFieldsType,
): ReactElement {
  const [expirationDate, setExpirationDate] = useState(`${couponData.utcExpirationISO} 00:00:00`);

  return (
    <>
      <TextInput required fieldName="price" defaultValue={couponData.price.toString()} />
      <DateInput fieldName="utcDateStringISO" value={expirationDate} label="expiration date" dateSetter={setExpirationDate} />
      <LinkInput required fieldName="link" defaultValue={couponData.link} />
      <input type="hidden" name="courseId" value={courseId} />
    </>
  );
}
