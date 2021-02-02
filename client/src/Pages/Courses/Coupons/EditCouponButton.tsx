import EditItemModal from 'Pages/Common/Modals/EditItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditCouponFields from './EditCouponFields';
import { editCoupon } from './Redux/Actions';
import { CouponType } from './Types';

interface editCouponButtonsProps {
  id: number;
  couponData: CouponType;
  courseId: number;
}

export default function EditCouponButton({
  id,
  couponData,
  courseId,
}: editCouponButtonsProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <EditItemModal
      handleSave={(data) => dispatch(editCoupon(data, couponData))}
      itemString="Coupon"
      ItemFields={
        <EditCouponFields couponData={couponData} courseId={courseId} />
      }
      id={id}
    />
  );
}
