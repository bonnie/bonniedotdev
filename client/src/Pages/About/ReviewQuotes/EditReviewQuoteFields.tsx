import SelectInput from 'Pages/Common/Inputs/SelectInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement } from 'react';
import {
  Course as CourseType,
  NewReviewQuote,
  ReviewQuote as ReviewQuoteType,
} from 'Types';

const newReviewQuote: NewReviewQuote = {
  body: '',
};

interface EditReviewQuoteFieldsType {
  reviewQuoteData?: ReviewQuoteType | NewReviewQuote;
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
          value: course.id,
          display: course.name,
        }))}
        defaultValue={reviewQuoteData.courseId || null}
        fieldName="courseId"
        displayName="course"
      />
    </>
  );
}
