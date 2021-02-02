import AddItemModal from 'Pages/Common/Modals/AddItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditCouponFields from './EditCouponFields';
import { addCoupon } from './Redux/Actions';

interface AddCouponButtonProps {
  courseId: number;
}

export default function AddCouponButton({
  courseId,
}: AddCouponButtonProps): ReactElement {
  const dispatch = useDispatch();
  return (
    <AddItemModal
      handleSave={(couponData) => dispatch(addCoupon(couponData))}
      itemString="Coupon"
      ItemFields={<EditCouponFields courseId={courseId} />}
    />
  );
}
