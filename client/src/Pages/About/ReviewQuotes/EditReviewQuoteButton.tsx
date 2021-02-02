/* eslint-disable react/jsx-wrap-multilines */
import EditItemModal from 'Pages/Common/Modals/EditItemModal';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditReviewQuoteFields from './EditReviewQuoteFields';
import { editReviewQuote } from './Redux/Actions';
import { ReviewQuoteType } from './Types';

interface editReviewQuoteButtonsProps {
  id: number;
  reviewQuoteData: ReviewQuoteType;
  courses: CourseType[];
}

export default function EditReviewQuoteButtons({
  id,
  reviewQuoteData,
  courses,
}: editReviewQuoteButtonsProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <EditItemModal
      handleSave={(data) => dispatch(editReviewQuote(data, reviewQuoteData))}
      itemString="Review Quote"
      ItemFields={
        <EditReviewQuoteFields
          reviewQuoteData={reviewQuoteData}
          courses={courses}
        />
      }
      id={id}
    />
  );
}
