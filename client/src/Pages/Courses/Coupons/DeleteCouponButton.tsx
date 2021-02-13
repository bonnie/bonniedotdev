import DeleteItemModal from 'Pages/Common/Modals/_DeleteItemButton';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { deleteCoupon } from './Redux/Actions';

interface DeleteCouponButtonsProps {
  id: number;
  name: string;
}

export default function DeleteCouponButtons({
  id,
  name,
}: DeleteCouponButtonsProps): ReactElement {
  const dispatch = useDispatch();
  return (
    <DeleteItemModal
      handleDelete={() => dispatch(deleteCoupon(id))}
      itemLabel={name}
      itemTypeString="Coupon"
    />
  );
}
