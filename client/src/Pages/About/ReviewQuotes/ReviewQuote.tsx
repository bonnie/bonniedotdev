/* eslint-disable sonarjs/cognitive-complexity */
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

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

interface ReadOnlyQuoteProps {
  reviewQuoteData: ReviewQuoteType,
  editButtons: ReactElement | null,
}

export default function ReviewQuote(
  { reviewQuoteData, editButtons }: ReadOnlyQuoteProps,
): ReactElement {
  const classes = useStyles();
  return (
    <Grid item className={classes.quoteGrid} xs={12} sm={6} md={4}>
      <Box className={classes.quoteBox} p={3} pt={3} pb={3} color="primary.main" bgcolor="background.main">
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
        <div className={classes.editButtons}>{editButtons}</div>
      </Box>
    </Grid>
  );
}
