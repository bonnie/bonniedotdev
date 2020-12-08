/* eslint-disable sonarjs/cognitive-complexity */
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

import ReviewQuoteBase from './ReviewQuoteBase';
import { ReviewQuoteType } from './Types';

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
}));

interface ReadOnlyQuoteProps {
  reviewQuoteData: ReviewQuoteType,
}

export default function ReadOnlyReviewQuote({ reviewQuoteData }: ReadOnlyQuoteProps): ReactElement {
  const classes = useStyles();
  const contents = (
    <>
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
        <Box className={classes.courseLinkBox} color="secondary.main" fontSize={12} mt={2}>
          <Typography>{reviewQuoteData.courseName}</Typography>
        </Box>
      </Link>
    </>
  );
  return <ReviewQuoteBase contents={contents} />;
}
