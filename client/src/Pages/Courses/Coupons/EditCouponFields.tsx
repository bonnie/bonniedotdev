/* eslint-disable max-lines-per-function */
import moment from 'moment';
import DateTimeInput from 'Pages/Common/Inputs/DateTimeInput';
import LinkInput from 'Pages/Common/Inputs/LinkInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement, useState } from 'react';

import { CouponType, NewCouponType } from './Types';

const newCoupon: NewCouponType = {
  price: 9.99,
  link: '',
  utcExpirationISO: moment(new Date()).toString(),
};

interface EditCouponFieldsType {
  couponData?: CouponType | NewCouponType;
  courseId: number;
}

EditCouponFields.defaultProps = { couponData: newCoupon };

export default function EditCouponFields(
  // courseId will always come in as a prop -- no editing/adding coupons
  // independent of a course
  { couponData = newCoupon, courseId }: EditCouponFieldsType,
): ReactElement {
  const [expirationDate, setExpirationDate] = useState(
    `${couponData.utcExpirationISO} 00:00:00`,
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
