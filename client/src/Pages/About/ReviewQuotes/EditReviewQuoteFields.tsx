import useCourses from 'Hooks/GetData/useCourses';
import SelectInput from 'Pages/Common/Inputs/SelectInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement } from 'react';
import { NewReviewQuote, ReviewQuote as ReviewQuoteType } from 'Types';

const newReviewQuote: NewReviewQuote = {
  body: '',
};

interface EditReviewQuoteFieldsType {
  reviewQuoteData?: ReviewQuoteType | NewReviewQuote;
}

EditReviewQuoteFields.defaultProps = { reviewQuoteData: newReviewQuote };

export default function EditReviewQuoteFields({
  reviewQuoteData = newReviewQuote,
}: EditReviewQuoteFieldsType): ReactElement {
  // since courses are cached by react-query,
  // it's fine to run useCourses for every new form
  const courses = useCourses();

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
