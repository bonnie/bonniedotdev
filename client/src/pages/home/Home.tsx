import '../_app/App.css';

import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

import SocialLinks from './SocialLinks';

// TODO: get this from theme rather than hard-coding
const useStyles = makeStyles(() => ({
  subtitle: {
    fontFamily: "'Roboto Mono', monospace",
    letterSpacing: '0.1em',
    fontSize: 20,
    fontWeight: 600,
  },
}));

/**
 * Functional top-level React component
 * @function App
 *
 * @returns {JSX.Element} component JSX
 */
export default function Home(): ReactElement {
  const classes = useStyles();

  return (
    <Box pt={10} textAlign="center">
      <Box m={3}>
        <Typography variant="h1" gutterBottom>Bonnie Schulkin</Typography>
      </Box>
      <Box m={3}>
        <Typography className={classes.subtitle} gutterBottom>teacher | coder</Typography>
      </Box>
      <SocialLinks />
    </Box>
  );
}
