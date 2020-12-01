/* eslint-disable sonarjs/cognitive-complexity */
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import urls from 'Constants/urls';
import { getFormData } from 'Helpers';
import EditButtons from 'Pages/Common/EditButtons';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';

import { setReviewQuotes, setReviewQuotesFromServer } from './Redux/actions';
import { ReviewQuoteDisplayType } from './Types';

const useStyles = makeStyles(() => ({
  quoteGrid: {
    display: 'flex',
    alignItems: 'stretch',
  },
  quoteBox: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '25px 25px 0px 25px',
    width: '100%',
    justifyContent: 'space-between',
  },
  courseLink: {
    fontFamily: "'Lato', sans-serif",
    fontVariant: 'normal',
    textTransform: 'none',
    '&:hover': {
      opacity: 0.8,
    },
  },
  courseLinkBox: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
}));

interface ReviewQuoteProps {
  quoteData: ReviewQuoteDisplayType,
  editable: boolean,
}

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuote(
  { quoteData, editable }: ReviewQuoteProps,
): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);

  const handleEdit = (event) => {
    event.preventDefault();

    // send the new quote back to the server
    const formData = getFormData(event);

    // send edits back to server
    dispatch({
      type: sagaActionIds.EDIT_SERVER_ITEM,
      payload: {
        url: urls.reviewQuotesURL,
        id: quoteData.id,
        method: axiosMethodOptions.post,
        data: formData,
        updateStateAction: setReviewQuotesFromServer(),
      },
    });
  };

  const handleDelete = async () => {
    if (quoteData.id < 0) {
      // negative id indicates not in the db. Just delete from state.
      const newQuotes = reviewQuotes.filter((quote) => quote.id !== quoteData.id);
      dispatch(setReviewQuotes(newQuotes));
    } else {
      // it's got to be deleted from the db
      dispatch({
        type: sagaActionIds.EDIT_SERVER_ITEM,
        payload: {
          url: urls.reviewQuotesURL,
          id: quoteData.id,
          method: axiosMethodOptions.delete,
          updateStateAction: setReviewQuotesFromServer(),
        },
      });
    }
  };

  // TODO: separate this into two components
  const readOnlyQuote = (
    <>
      <Box fontStyle="italic">
        <Typography component="p">{quoteData ? quoteData.body : ''}</Typography>
      </Box>
      <Link
        className={classes.courseLink}
        underline="none"
        href={quoteData ? quoteData.courseLink : ''}
        target="_blank"
        rel="noreferrer"
      >
        <Box className={classes.courseLinkBox} color="secondary.main" fontSize={12} mt={2}>
          <Typography>{quoteData ? quoteData.courseName : ''}</Typography>
        </Box>
      </Link>
    </>
  );

  const editQuote = (
    <Box>
      <form onSubmit={handleEdit}>
        <TextField
          multiline
          name="body"
          id="body"
          label="Quote"
          style={{ width: '100%' }}
          defaultValue={quoteData ? quoteData.body : ''}
        />
        <Box mt={2}>
          <FormControl>
            <InputLabel id="course-select">Course</InputLabel>
            <Select
              labelId="course-select"
              id="courseId"
              name="courseId"
              defaultValue={1}
              style={{ width: '100%' }}
            >
              <MenuItem value={1}>Course1</MenuItem>
              <MenuItem value={2}>Course2</MenuItem>
              <MenuItem value={3}>Course3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <EditButtons handleDelete={handleDelete} deleteItemString="quote" />
      </form>
    </Box>
  );

  return (
    <Grid
      item
      className={classes.quoteGrid}
      xs={12}
      sm={6}
      md={4}
    >
      <Box
        className={classes.quoteBox}
        p={3}
        pt={3}
        pb={3}
        color="primary.main"
        bgcolor="background.main"
      >
        {editable ? editQuote : readOnlyQuote}
      </Box>
    </Grid>
  );
}
