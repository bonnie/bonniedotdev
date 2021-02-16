/* eslint-disable sonarjs/cognitive-complexity */
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { reviewQuoteDetails } from 'Constants/itemConstants';
import EditButtons from 'Pages/Common/EditButtons';
import React, { ReactElement } from 'react';
import { Course, ReviewQuote as ReviewQuoteType } from 'Types';

import EditReviewQuoteFields from './EditReviewQuoteFields';

const useStyles = makeStyles(() => ({
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
  editButtons: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
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
    flexShrink: 3,
    minWidth: 120,
  },
}));

interface ReviewQuoteProps {
  reviewQuoteData: ReviewQuoteType;
  courses: Course[];
}

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuote({
  reviewQuoteData,
  courses,
}: ReviewQuoteProps): ReactElement {
  const classes = useStyles();

  const ReviewQuoteEditFieldsComponent = (
    <EditReviewQuoteFields
      reviewQuoteData={reviewQuoteData}
      courses={courses}
    />
  );

  const reviewQuoteEditButtons = (
    <EditButtons
      itemDetails={reviewQuoteDetails}
      itemData={reviewQuoteData}
      ItemFieldsComponent={ReviewQuoteEditFieldsComponent}
    />
  );

  return (
    <Grid item className={classes.quoteGrid} xs={12} sm={6} md={4}>
      <Box
        className={classes.quoteBox}
        p={3}
        pt={3}
        pb={3}
        color="primary.main"
        bgcolor="background.main"
      >
        <Box fontStyle="italic">
          <Typography component="p">{reviewQuoteData.body}</Typography>
        </Box>
        <Link
          className={classes.courseLink}
          underline="none"
          href={reviewQuoteData.courseLink}
          target="_blank"
          rel="noreferrer"
        >
          <Box
            className={classes.courseLinkBox}
            color="secondary.main"
            fontSize={12}
            mt={2}
          >
            <Typography>{reviewQuoteData.courseName}</Typography>
          </Box>
        </Link>
        {reviewQuoteEditButtons ? (
          <div className={classes.editButtons}>{reviewQuoteEditButtons}</div>
        ) : null}
      </Box>
    </Grid>
  );
}
