import DeleteItemModal from 'Pages/Common/DeleteItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { deleteTalk } from './Redux/Actions';

interface DeleteTalkButtonsProps {
  id: number,
  name: string
}

export default function DeleteTalkButtons({ id, name }: DeleteTalkButtonsProps): ReactElement {
  const dispatch = useDispatch();
  return (
    <DeleteItemModal
      handleDelete={() => dispatch(deleteTalk(id))}
      itemLabel={name}
    />
  );
}
