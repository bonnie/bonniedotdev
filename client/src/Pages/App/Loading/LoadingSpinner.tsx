import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    alignSelf: 'center',
  },
}));

export default function LoadingSpinner(): ReactElement {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CircularProgress className={classes.loading} />
    </Box>
  );
}
