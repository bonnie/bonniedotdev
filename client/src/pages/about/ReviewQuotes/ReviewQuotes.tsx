import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddButton from 'Pages/Common/AddButton';
import { setCoursesFromServer } from 'Pages/Courses/Redux/actions';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditReviewQuote from './EditReviewQuote';
import ReadOnlyReviewQuote from './ReadOnlyReviewQuote';
import { setReviewQuotes, setReviewQuotesFromServer } from './Redux/actions';
import { ReviewQuoteType } from './Types';

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuotes(): ReactElement {
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);
  const courses = useSelector((state) => state.courses);

  // const user = useSelector((state) => state.user);
  const user = true; // TODO: <------------ for testing only!!!

  // TODO refactor so code is not repeated between this and Courses.tsx
  const [addButton, setAddButton] = useState(user !== null);

  // populate review quotes data from the server
  useEffect(() => { dispatch(setReviewQuotesFromServer()); }, [dispatch]);

  // populate the courses, but only if they're needed for quote edit selection
  // Do this here, so it doesn't have to be done individually on each editable quote
  useEffect(() => { dispatch(setCoursesFromServer()); }, [dispatch]);

  const addQuote = () => {
    const newQuote: ReviewQuoteType = { body: '', id: 0 - (reviewQuotes.length + 1) };
    dispatch(setReviewQuotes([...reviewQuotes, newQuote]));

    // only allow adding one quote at a time
    setAddButton(false);
  };

  const mapQuoteToElement = user
    ? (reviewQuote) => (
      <EditReviewQuote
        key={reviewQuote.id}
        reviewQuoteData={reviewQuote}
        courses={courses}
        setAddButton={setAddButton}
      />
    )
    : (reviewQuote) => (
      <ReadOnlyReviewQuote
        key={reviewQuote.id}
        reviewQuoteData={reviewQuote}
      />
    );

  return (
    <Box component="section" mt={4} mb={4} p={2} pt={2}>
      <Typography variant="h2" gutterBottom>
        Students say...
      </Typography>
      <Grid container spacing={3}>
        {reviewQuotes.map(mapQuoteToElement)}
        {addButton ? <AddButton onClick={addQuote} /> : null}
      </Grid>
    </Box>
  );
}
