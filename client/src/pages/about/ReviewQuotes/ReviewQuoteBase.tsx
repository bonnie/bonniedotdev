/* eslint-disable sonarjs/cognitive-complexity */
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { ReactElement } from 'react';

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

}));

interface ReviewQuoteProps {
  contents: ReactElement,
  newQuote?: boolean
}

ReviewQuote.defaultProps = { newQuote: false };

export default function ReviewQuote({ contents, newQuote }: ReviewQuoteProps): ReactElement {
  const classes = useStyles();
  // TODO: make this classier than just having a green background
  // TODO: unify it with new course styling
  const bg = newQuote ? '#efe' : 'background.main';

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
        bgcolor={bg}
      >
        {contents}
      </Box>
    </Grid>
  );
}
