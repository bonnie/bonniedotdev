import DeleteItemModal from 'Pages/Common/Modals/DeleteItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { deleteReviewQuote } from './Redux/Actions';

interface DeleteReviewQuoteButtonsProps {
  id: number,
  name: string
}

export default function DeleteReviewQuoteButtons(
  { id, name }: DeleteReviewQuoteButtonsProps,
): ReactElement {
  const dispatch = useDispatch();
  return (
    <DeleteItemModal
      handleDelete={() => dispatch(deleteReviewQuote(id))}
      itemLabel={name}
      itemTypeString="Review Quote"
    />
  );
}
