import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import { setCoursesFromServer } from 'Pages/Courses/Redux/Actions';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddReviewQuoteButton from './AddReviewQuoteButton';
import DeleteReviewQuoteButton from './DeleteReviewQuoteButton';
import EditReviewQuoteButton from './EditReviewQuoteButton';
import { setReviewQuotesFromServer } from './Redux/Actions';
import ReviewQuote from './ReviewQuote';
import { ReviewQuoteType } from './Types';

const mapReviewQuoteToElement = (
  reviewQuoteData: ReviewQuoteType,
  user: boolean,
  courses: CourseType[],
) => {
  const editButtons = (
    <>
      <EditReviewQuoteButton
        id={reviewQuoteData.id}
        reviewQuoteData={reviewQuoteData}
        courses={courses}
      />
      <DeleteReviewQuoteButton
        id={reviewQuoteData.id}
        name="this review quote"
      />
    </>
  );
  return (
    <ReviewQuote
      key={reviewQuoteData.id}
      reviewQuoteData={reviewQuoteData}
      editButtons={user ? editButtons : null}
    />
  );
};

export default function ReviewQuotes(): ReactElement {
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  // populate review quotes data from the server
  useEffect(() => {
    dispatch(setReviewQuotesFromServer());
  }, [dispatch]);

  // Do this here, so it doesn't have to be done individually on each editable quote
  useEffect(() => {
    if (user) dispatch(setCoursesFromServer());
  }, [dispatch, user]);

  return useMemo(
    () => (
      <Box component="section" mt={4} mb={4}>
        <PageTitleWithAdd
          title="Students say..."
          variant="h2"
          AddButton={<AddReviewQuoteButton courses={courses} />}
        />
        <Grid container spacing={3}>
          {reviewQuotes.map((data) =>
            mapReviewQuoteToElement(data, !!user, courses),
          )}
        </Grid>
      </Box>
    ),
    [reviewQuotes, courses, user],
  );
}
