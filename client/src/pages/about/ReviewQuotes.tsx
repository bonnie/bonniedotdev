import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionTypes } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum } from '../../types';

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
  const dispatch = useDispatch();
  const reviewQuotes = useSelector((state) => state.reviewQuotes);
  const classes = useStyles();
  const callServer = useAxios();

  useEffect(() => {
    const getDataFromServer = async () => {
      const rawData = await callServer(dispatch, {
        method: axiosMethodEnum.get,
        url: '/api/review_quotes',
      });
      let payload = rawData;
      // TODO: figure out typescript here...
      if (rawData !== null && rawData?.length > 1) {
        payload = rawData.sort((a, b) => a.body.length - b.body.length);
      }
      dispatch({ type: actionTypes.SET_REVIEW_QUOTES, payload });
    };
    getDataFromServer();
  }, [dispatch, callServer]);

  // sort by length

  return (
    <Box component="section" mt={4} mb={4} p={2} pt={2}>
      <Typography variant="h2" gutterBottom>
        Students say...
      </Typography>
      <Grid container spacing={3}>
        {reviewQuotes.map((quote) => (
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
