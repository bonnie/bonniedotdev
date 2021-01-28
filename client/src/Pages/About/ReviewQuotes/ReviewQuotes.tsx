/* eslint-disable sonarjs/cognitive-complexity */
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { hasNewItem } from 'Helpers';
import AddButton from 'Pages/Common/AddButton';
import { setCoursesFromServer } from 'Pages/Courses/Redux/Actions';
import React, {
  ReactElement, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditReviewQuote from './EditReviewQuote';
import ReadOnlyReviewQuote from './ReadOnlyReviewQuote';
import { setReviewQuotes, setReviewQuotesFromServer } from './Redux/Actions';
import { ReviewQuoteType } from './Types';

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuotes(): ReactElement {
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  // TODO: unify this code so it's shared with Courses.tsx rather than repeated
  // only allow one new quote at a time, since submitting a new quote will obliterate
  // any other quotes-in-progress
  const [addButton, setAddButton] = useState(user !== null);
  useEffect(
    () => {
      if (user) setAddButton(!hasNewItem(reviewQuotes));
    },
    [user, reviewQuotes],
  );

  // populate review quotes data from the server
  useEffect(() => { dispatch(setReviewQuotesFromServer()); }, [dispatch]);

  // populate the courses, but only if they're needed for quote edit selection
  // Do this here, so it doesn't have to be done individually on each editable quote
  // TODO: cache this!
  useEffect(() => { if (user) dispatch(setCoursesFromServer()); }, [dispatch, user]);

  // wrap in useCallback to keep from regenerating needlessly
  const addQuote = useCallback(() => {
    const newQuote: ReviewQuoteType = { body: '', id: 0 - (reviewQuotes.length + 1) };
    dispatch(setReviewQuotes([...reviewQuotes, newQuote]));
  }, [reviewQuotes, dispatch]);

  const deleteQuote = useCallback((id) => {
    const newReviewQuotes = reviewQuotes.filter((rq) => rq.id !== id);
    dispatch(setReviewQuotes(newReviewQuotes));
  }, [reviewQuotes, dispatch]);

  const mapQuoteToElement = useMemo(() => (user
    ? (reviewQuote, index) => (
      <EditReviewQuote
        key={reviewQuote.id}
        reviewQuoteData={reviewQuote}
        courses={courses}
        deleteReviewQuoteFromState={deleteQuote}
        reviewQuoteIndex={index}
      />
    )
    : (reviewQuote) => (
      <ReadOnlyReviewQuote
        key={reviewQuote.id}
        reviewQuoteData={reviewQuote}
      />
    )), [user, courses, deleteQuote]);

  return useMemo(() => (
    <Box component="section" mt={4} mb={4}>
      <Typography variant="h2" gutterBottom>
        Students say...
      </Typography>
      <Grid container spacing={3}>
        {reviewQuotes.map(mapQuoteToElement)}
        {addButton ? <AddButton onClick={addQuote} itemString="Review Quote" /> : null}
      </Grid>
    </Box>
  ), [addButton, addQuote, mapQuoteToElement, reviewQuotes]);
}
