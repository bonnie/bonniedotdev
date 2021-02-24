import './App.css';

import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import skyImage from 'Images/sky.jpg';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from '../About/About';
import Login from '../Auth/Login';
import UserHome from '../Auth/UserHome';
import CheatSheets from '../CheatSheets/CheatSheets';
import Courses from '../Courses/Courses';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import Talks from '../Talks/Talks';

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
}));

export default function Routes(): ReactElement {
  const classes = useStyles();
  return (
    <Container>
      <img
        src={skyImage}
        alt="fog rolling over mountains"
        className={classes.backgroundImg}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/talks" component={Talks} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/about" component={About} />
        <Route exact path="/cheatsheets" component={CheatSheets} />
        <Route exact path="/user" component={UserHome} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Container>
  );
}
