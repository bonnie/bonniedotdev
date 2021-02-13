import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import urls from 'Constants/urls';
import useCourses from 'Hooks/GetData/useCourses';
import useReviewQuotes from 'Hooks/GetData/useReviewQuotes';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import { CourseType } from 'Pages/Courses/Types';
import React, { ReactElement, useMemo } from 'react';
import { ReviewQuote as ReviewQuoteType } from 'Types';

import EditReviewQuoteFields from './EditReviewQuoteFields';
import ReviewQuote from './ReviewQuote';

const mapReviewQuoteToElement = (
  reviewQuoteData: ReviewQuoteType,
  courses: CourseType[],
) => (
  <ReviewQuote
    key={reviewQuoteData.id}
    reviewQuoteData={reviewQuoteData}
    courses={courses}
  />
);

export default function ReviewQuotes(): ReactElement {
  const courses = useCourses();
  const reviewQuotes = useReviewQuotes();

  return useMemo(
    () => (
      <Box component="section" mt={4} mb={4}>
        <PageTitleWithAdd
          title="Students say..."
          variant="h2"
          itemEndpoint={urls.reviewQuoteURL}
          itemString="Review Quote"
          ItemFieldsComponent={<EditReviewQuoteFields courses={courses} />}
        />
        <Grid container spacing={3}>
          {reviewQuotes.map((data) => mapReviewQuoteToElement(data, courses))}
        </Grid>
      </Box>
    ),
    [reviewQuotes, courses],
  );
}
