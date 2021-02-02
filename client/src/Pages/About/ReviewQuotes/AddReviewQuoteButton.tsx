import AddItemModal from 'Pages/Common/Modals/AddItemModal';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import EditReviewQuoteFields from './EditReviewQuoteFields';
import { addReviewQuote } from './Redux/Actions';

interface AddReviewQuoteButtonProps {
  courses: CourseType[];
}

export default function AddReviewQuoteButton({
  courses,
}: AddReviewQuoteButtonProps): ReactElement {
  const dispatch = useDispatch();
  return (
    <AddItemModal
      handleSave={(reviewQuoteData) =>
        dispatch(addReviewQuote(reviewQuoteData))
      }
      itemString="Review Quote"
      ItemFields={<EditReviewQuoteFields courses={courses} />}
    />
  );
}
