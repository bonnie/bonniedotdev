import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import avatar from 'Images/avatar_small.png';
import LogoutIconButton from 'Pages/Auth/LogoutIconButton';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

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

// eslint-disable-next-line max-lines-per-function
export default function Nav(): ReactElement {
  // for hidden auth routes, no tab associated
  const nonTabRoutes = RegExp(/login|logout/);

  const classes = useStyles();
  const { pathname } = window.location;
  const [value, setValue] = useState(pathname);

  const handleChange = (event, newValue) => {
    if (nonTabRoutes.test(newValue)) {
      setValue('/');
    } else {
      setValue(newValue);
    }
  };

  // handle page reload for non-tab routes gracefully
  if (nonTabRoutes.test(value)) {
    setValue('/');
  }

  const homeButton = (
    <Button>
      <Avatar alt="bonnie.dev" src={avatar} />
      <Box color="primary.light" pl={2}>
        <Typography className={classes.bonnie}>bonnie.dev</Typography>
      </Box>
    </Button>
  );

  return (
    <AppBar>
      <Box bgcolor="background.dark" color="primary.light" position="static">
        <Tabs value={value} onChange={handleChange}>
          {/* TODO: make hamburger on xs */}
          <Tab
            className={classes.tab}
            label={homeButton}
            value="/"
            component={Link}
            to="/"
          />
          <Tab
            className={classes.tab}
            label="courses"
            value="/courses"
            component={Link}
            to="/courses"
          />
          <Tab
            className={classes.tab}
            label="talks"
            value="/talks"
            component={Link}
            to="/talks"
          />
          <Tab
            className={classes.tab}
            label="about"
            value="/about"
            component={Link}
            to="/about"
          />
          <LogoutIconButton />
        </Tabs>
      </Box>
    </AppBar>
  );
}
