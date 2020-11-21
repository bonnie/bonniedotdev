import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

import { ReviewQuotesByCourseType } from '../../types';

type ReviewQuotesProps = {
  reviewQuotesData: ReviewQuotesByCourseType,
};

const sortQuotes = function (quotes) {
  // mash quotes up so they're not sorted by course
  const mashQuotes = quotes.reduce((allQuotes, item) => (allQuotes.concat(
    item.reviewQuotes.map((quote) => ({
      courseName: item.courseName,
      id: quote.id,
      body: quote.reviewQuote,
    })),
  )), []);

  return mashQuotes.sort((a, b) => a.body.length > b.body.length);
};

export default function ReviewQuotes({ reviewQuotesData }: ReviewQuotesProps): ReactElement {
  // sort by length
  const sortedQuotes = sortQuotes(reviewQuotesData);

  return (
    <Box component="section" mt={4} mb={4} p={2} pt={2}>
      <Typography variant="h2" gutterBottom>
        Students say...
      </Typography>
      <Grid container spacing={3}>
        {sortedQuotes.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote.id}>
            <Box key={quote.id} p={3} pt={3} pb={3} color="primary.main" bgcolor="background.main" style={{ borderRadius: '25px 25px 25px 5px' }}>
              <Box fontStyle="italic">
                <Typography component="p">{quote.body}</Typography>
              </Box>
              <Box color="secondary.main" fontSize={12} mt={2}>
                <Typography>{quote.courseName}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
