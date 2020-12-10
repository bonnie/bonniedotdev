import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddButton from 'Pages/Common/AddButton';
import { setCoursesFromServer } from 'Pages/Courses/Redux/Actions';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditReviewQuote from './EditReviewQuote';
import ReadOnlyReviewQuote from './ReadOnlyReviewQuote';
import { setReviewQuotes, setReviewQuotesFromServer } from './Redux/Actions';
import { ReviewQuoteType } from './Types';

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuotes(): ReactElement {
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => {
    console.log('~!~!~!~!~!~!~!~!~! state updated to', state);
    return state.reviewQuotes;
  });
  const courses = useSelector((state) => state.courses);

  // console.log('REVIEW QUOTES', reviewQuotes);

  const user = useSelector((state) => state.user);

  // TODO refactor so code is not repeated between this and Courses.tsx
  const [addButton, setAddButton] = useState(user !== null);

  // populate review quotes data from the server
  useEffect(() => { dispatch(setReviewQuotesFromServer()); }, [dispatch]);

  // populate the courses, but only if they're needed for quote edit selection
  // Do this here, so it doesn't have to be done individually on each editable quote
  // TODO: cache this!
  useEffect(() => { if (user) dispatch(setCoursesFromServer()); }, [dispatch, user]);

  const addQuote = () => {
    const newQuote: ReviewQuoteType = { body: '', id: 0 - (reviewQuotes.length + 1) };
    dispatch(setReviewQuotes([...reviewQuotes, newQuote]));

    // only allow adding one quote at a time
    setAddButton(false);
  };

  const deleteQuote = (id) => {
    const newReviewQuotes = reviewQuotes.filter((rq) => rq.id !== id);
    dispatch(setReviewQuotes(newReviewQuotes));

    // reinstate the "add" button
    setAddButton(true);
  };

  const mapQuoteToElement = user
    ? (reviewQuote, index) => (
      <EditReviewQuote
        key={reviewQuote.id}
        reviewQuoteData={reviewQuote}
        courses={courses}
        setAddButton={setAddButton}
        deleteReviewQuoteFromState={deleteQuote}
        reviewQuoteIndex={index}
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
