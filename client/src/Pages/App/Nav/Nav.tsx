import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import avatar from 'Images/avatar_small.png';
import LogoutIconButton from 'Pages/Auth/LogoutIconButton';
import React, { ReactElement } from 'react';

import NavMenu from './NavMenu';
import NavTabs from './NavTabs';

const useStyles = makeStyles((theme: Theme) => ({
  // TODO: get from theme rather than hard-coding
  bonnie: {
    fontFamily: "'Lato', sans-serif",
    fontVariant: 'normal',
    textTransform: 'none',
    letterSpacing: '0.05em',
  },
  navTabsHide: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  navMenuHide: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

// eslint-disable-next-line max-lines-per-function
export default function Nav(): ReactElement {
  const classes = useStyles();

  const tabList = ['courses', 'talks', 'about'];

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
        <NavTabs
          breakpointClass={classes.navTabsHide}
          homeButton={homeButton}
          tabList={tabList}
        />
        <NavMenu
          breakpointClass={classes.navMenuHide}
          homeButton={homeButton}
          tabList={tabList}
        />
      </Box>
      <LogoutIconButton />
    </AppBar>
  );
}
