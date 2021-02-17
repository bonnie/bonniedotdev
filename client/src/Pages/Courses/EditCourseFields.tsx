import ImageNameInput from 'Pages/Common/Inputs/ImageNameInput';
import LinkInput from 'Pages/Common/Inputs/LinkInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement } from 'react';
import { Course as CourseType, NewCourse } from 'Types';

const newCourse: NewCourse = {
  name: '',
  description: '',
  link: '',
  imageName: '',
};

interface EditCourseFieldsType {
  courseData?: CourseType | NewCourse;
}

EditCourseFields.defaultProps = { courseData: newCourse };

export default function EditCourseFields({
  courseData = newCourse,
}: EditCourseFieldsType): ReactElement {
  // TODO: allow upload of course image
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
