import AddItemModal from 'Pages/Common/Modals/AddItemButton';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditCourseFields from './EditCourseFields';
import { addCourse } from './Redux/Actions';

export default function AddCourseButton(): ReactElement {
  const dispatch = useDispatch();
  return (
    <AddItemModal
      handleSave={(courseData) => dispatch(addCourse(courseData))}
      itemString="Course"
      ItemFields={<EditCourseFields />}
    />
  );
}
