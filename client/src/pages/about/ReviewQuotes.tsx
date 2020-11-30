import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import urls from '../../constants/urls';
import { actionIds, setReviewQuotes } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum, ReviewQuoteType } from '../../types';
import AddButton from '../common/AddButton';
import ReviewQuote from './ReviewQuote';

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuotes(): ReactElement {
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);
  const callServer = useAxios();

  // const user = useSelector((state) => state.user);
  const user = true; // TODO: <------------ for testing only!!!

  // track whether quotes have been updated
  const [newQuotes, updateNewQuotes] = useState(false);

  useEffect(() => {
    const getDataFromServer = async () => {
      const rawData = await callServer(dispatch, {
        method: axiosMethodEnum.GET,
        url: urls.reviewQuotesURL,
      });
      let payload = rawData;

      // sort by length for more compact rows
      if (rawData !== null && rawData?.length > 1) {
        payload = rawData.sort((a, b) => a.body.length - b.body.length);
      }
      dispatch({ type: actionIds.SET_REVIEW_QUOTES, payload });
    };
    getDataFromServer();
  }, [dispatch, callServer, newQuotes]);
  // TODO: this will only work once, since once newQuotes is set to true,
  //  it's never set to false again. can't set to false within useEffect (infinite loop)

  const addQuote = () => {
    const newQuote: ReviewQuoteType = { body: '', id: 0 - reviewQuotes.length - 1 };
    dispatch(setReviewQuotes([...reviewQuotes, newQuote]));
  };

  return (
    <Box component="section" mt={4} mb={4} p={2} pt={2}>
      <Typography variant="h2" gutterBottom>
        Students say...
      </Typography>
      <Grid container spacing={3}>
        {reviewQuotes.map((quote) => (
          <ReviewQuote
            key={quote.id}
            quoteData={quote}
            editable={user !== null}
            updateNewQuotes={updateNewQuotes}
          />
        ))}
        {user ? <AddButton onClick={addQuote} /> : null}
      </Grid>
    </Box>
  );
}
