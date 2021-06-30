import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
  const [filter, setFilter] = React.useState('No filter');

  return useMemo(
    () => (
      <Box component="section" mt={4} mb={4}>
        <Select
          id="demo-simple-select"
          value={filter}
          autoWidth
          onChange={(e) => setFilter(e.target.value)}
          style={{ position: 'absolute', marginLeft: '1000px' }}
        >
          <MenuItem value="No filter">
            <em>No filter</em>
          </MenuItem>
          <MenuItem value="React Query: Server State Management in React">
            React Query: Server State Management in React
          </MenuItem>
          <MenuItem value="React Testing with Jest and Enzyme">
            React Testing with Jest and Enzyme
          </MenuItem>
          <MenuItem value="React Testing with Jest and Testing Library">
            React Testing with Jest and Testing Library
          </MenuItem>
          <MenuItem value="Regular Expressions for Beginners and Beyond!">
            Regular Expressions for Beginners and Beyond!
          </MenuItem>
        </Select>
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
