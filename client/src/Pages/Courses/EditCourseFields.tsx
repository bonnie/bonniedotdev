import ImageNameInput from 'Pages/Common/Inputs/ImageNameInput';
import LinkInput from 'Pages/Common/Inputs/LinkInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement } from 'react';

import { CourseType } from './Types';

const newCourse: CourseType = {
  id: null,
  name: '',
  description: '',
  link: '',
  imageName: '',
};

interface EditCourseFieldsType {
  courseData?: CourseType;
}

EditCourseFields.defaultProps = { courseData: newCourse };

export default function EditCourseFields({
  courseData = newCourse,
}: EditCourseFieldsType): ReactElement {
  return (
    <>
      <TextInput required fieldName="name" defaultValue={courseData.name} />
      <TextInput
        required
        fieldName="description"
        defaultValue={courseData.description}
      />
      <LinkInput required fieldName="link" defaultValue={courseData.link} />
      <ImageNameInput
        required
        fieldName="imageName"
        defaultValue={courseData.imageName}
      />
    </>
  );
}
