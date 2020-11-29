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
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import urls from '../../constants/urls';
import { getFormData } from '../../helpers';
import { setReviewQuotes } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum, ReviewQuoteDisplayType } from '../../types';
import EditButtons from '../common/EditButtons';

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
  updateNewQuotes: (boolean) => void,
}

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuote(
  { quoteData, editable, updateNewQuotes }: ReviewQuoteProps,
): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const callServer = useAxios();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);

  const handleSubmit = (event) => {
    event.preventDefault();

    // send the new quote back to the server
    const formData = getFormData(event);
    const newQuote = callServer(
      dispatch,
      { url: urls.reviewQuoteURL, method: axiosMethodEnum.POST, data: formData },
    );

    // let the parent know it's time to refresh the quotes
    if (newQuote) updateNewQuotes(true);
  };

  const handleDelete = async () => {
    if (quoteData.id < 0) {
      // negative id indicates not in the db. Just delete from state.
      const newQuotes = reviewQuotes.filter((quote) => quote.id !== quoteData.id);
      dispatch(setReviewQuotes(newQuotes));
    } else {
      // it's got to be deleted from the db
      await callServer(
        dispatch,
        { url: urls.reviewQuoteURL, method: axiosMethodEnum.DELETE, urlParam: quoteData.id },
      );

      // TODO: update reviewQuotes state with new data from the server
    }
  };

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
      <form onSubmit={handleSubmit}>
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
