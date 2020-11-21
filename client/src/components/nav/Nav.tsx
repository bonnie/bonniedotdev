import { Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../images/avatar_small.png';

// TODO: get this from theme rather than hard-coding
const useStyles = makeStyles(() => ({
  tab: {
    fontFamily: "'Roboto Mono', monospace",
    fontVariant: 'normal',
    textTransform: 'none',
    letterSpacing: '0.1em',
  },
  bonnie: {
    fontFamily: "'Lato', sans-serif",
    fontVariant: 'normal',
    textTransform: 'none',
    letterSpacing: '0.05em',
  },
}));

export default function Nav(): ReactElement {
  const { pathname } = window.location;
  const [value, setValue] = useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <AppBar>
      <Box bgcolor="background.dark" color="primary.light" position="static">

        <Tabs value={value} onChange={handleChange}>
          <Button label="home" component={Link} to="/" onClick={handleChange}>
            <Avatar alt="bonnie.dev" src={avatar} />
            <Box color="primary.light" pl={2}>
              <Typography className={classes.bonnie}>bonnie.dev</Typography>
            </Box>
          </Button>
          <Tab className={classes.tab} label="courses" value="/courses" component={Link} to="/courses" />
          <Tab className={classes.tab} label="about" value="/about" component={Link} to="/about" />
        </Tabs>
      </Box>
    </AppBar>
  );
}
