import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement, useEffect, useState } from 'react';

import { getDataFromServer } from '../../redux/actions';
import { ReviewQuoteDisplayType } from '../../types';

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

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuotes(): ReactElement {
  const [reviewQuotesData, setReviewQuotesData] = useState<ReviewQuoteDisplayType[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const getAndSortQuotes = async () => {
      await getDataFromServer('/api/review_quotes', setReviewQuotesData);

      // sort the data by length for more even rows
      setReviewQuotesData(reviewQuotesData.sort((a, b) => a.body.length - b.body.length));
    };
    getAndSortQuotes();
  }, []);

  // sort by length

  return (
    <Box component="section" mt={4} mb={4} p={2} pt={2}>
      <Typography variant="h2" gutterBottom>
        Students say...
      </Typography>
      <Grid container spacing={3}>
        {reviewQuotesData.map((quote) => (
          <Grid
            item
            className={classes.quoteGrid}
            xs={12}
            sm={6}
            md={4}
            key={quote.id}
          >
            <Box
              key={quote.id}
              className={classes.quoteBox}
              p={3}
              pt={3}
              pb={3}
              color="primary.main"
              bgcolor="background.main"
            >
              <Box fontStyle="italic">
                <Typography component="p">{quote.body}</Typography>
              </Box>
              <Link
                className={classes.courseLink}
                underline="none"
                href={quote.courseLink}
                target="_blank"
                rel="noreferrer"
              >
                <Box className={classes.courseLinkBox} color="secondary.main" fontSize={12} mt={2}>
                  <Typography>{quote.courseName}</Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
