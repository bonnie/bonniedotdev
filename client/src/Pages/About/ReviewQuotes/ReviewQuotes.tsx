import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { reviewQuoteDetails } from 'Constants/itemConstants';
import useReviewQuotes from 'Hooks/GetData/useReviewQuotes';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement, useMemo } from 'react';
import { ReviewQuote as ReviewQuoteType } from 'Types';

import EditReviewQuoteFields from './EditReviewQuoteFields';
import ReviewQuote from './ReviewQuote';

const mapReviewQuoteToElement = (reviewQuoteData: ReviewQuoteType) => (
  <ReviewQuote key={reviewQuoteData.id} reviewQuoteData={reviewQuoteData} />
);

export default function ReviewQuotes(): ReactElement {
  const reviewQuotes = useReviewQuotes();

  return useMemo(
    () => (
      <Box component="section" mt={4} mb={4}>
        <PageTitleWithAdd
          title="Students say..."
          variant="h2"
          itemDetails={reviewQuoteDetails}
          ItemFieldsComponent={<EditReviewQuoteFields />}
        />
        <Grid container spacing={3}>
          {reviewQuotes.map((data) => mapReviewQuoteToElement(data))}
        </Grid>
      </Box>
    ),
    [reviewQuotes],
  );
}
