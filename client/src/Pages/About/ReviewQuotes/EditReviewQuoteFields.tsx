import SelectInput from 'Pages/Common/Inputs/SelectInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement } from 'react';

import { NewReviewQuoteType, ReviewQuoteType } from './Types';

const newReviewQuote: NewReviewQuoteType = {
  body: '',
};

interface EditReviewQuoteFieldsType {
  reviewQuoteData?: ReviewQuoteType | NewReviewQuoteType;
  courses: CourseType[];
}

EditReviewQuoteFields.defaultProps = { reviewQuoteData: newReviewQuote };

export default function EditReviewQuoteFields({
  reviewQuoteData = newReviewQuote,
  courses,
}: EditReviewQuoteFieldsType): ReactElement {
  return (
    <>
      <TextInput
        required
        fieldName="body"
        defaultValue={reviewQuoteData.body}
      />
      <SelectInput
        required
        options={courses.map((course) => ({
          value: course.id ?? -1,
          display: course.name,
        }))}
        defaultValue={reviewQuoteData.courseId || null}
        fieldName="courseId"
        displayName="course"
      />
    </>
  );
}
