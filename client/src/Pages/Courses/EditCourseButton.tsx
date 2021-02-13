import EditItemModal from 'Pages/Common/Modals/_EditItemButtons';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditCourseFields from './EditCourseFields';
import { editCourse } from './Redux/Actions';
import { CourseType } from './Types';

interface editCourseButtonsProps {
  id: number;
  courseData: CourseType;
}

export default function EditCourseButtons({
  id,
  courseData,
}: editCourseButtonsProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <EditItemModal
      handleSave={(data) => dispatch(editCourse(data, courseData))}
      itemString="Course"
      ItemFields={<EditCourseFields courseData={courseData} />}
      id={id}
    />
  );
}
