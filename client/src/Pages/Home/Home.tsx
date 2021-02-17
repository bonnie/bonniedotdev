import '../App/App.css';

import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import fogImage from 'Images/fog_lighter.jpg';
import React, { ReactElement } from 'react';

import SocialLinks from './SocialLinks';

// TODO: get this from theme rather than hard-coding
const useStyles = makeStyles(() => ({
  backgroundImg: {
    minHeight: '100%',
    minWidth: '1024px',

    /* Set up proportionate scaling */
    width: '100%',
    height: 'auto',

    /* Set up positioning */
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  },
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
      <img
        src={fogImage}
        alt="fog rolling over mountains"
        className={classes.backgroundImg}
      />
      <Box m={3}>
        <Typography variant="h1" gutterBottom>
          Bonnie Schulkin
        </Typography>
      </Box>
      <Box m={3}>
        <Typography className={classes.subtitle} gutterBottom>
          teacher | coder
        </Typography>
      </Box>
      <SocialLinks />
    </Box>
  );
}
