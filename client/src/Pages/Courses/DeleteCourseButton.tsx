import DeleteItemModal from 'Pages/Common/Modals/DeleteItemModal';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { deleteCourse } from './Redux/Actions';

interface DeleteCourseButtonsProps {
  id: number,
  name: string
}

export default function DeleteCourseButtons(
  { id, name }: DeleteCourseButtonsProps,
): ReactElement {
  const dispatch = useDispatch();
  return (
    <DeleteItemModal
      handleDelete={() => dispatch(deleteCourse(id))}
      itemLabel={name}
      itemTypeString="Review Quote"
    />
  );
}
