import './App.css';

import Container from '@material-ui/core/Container';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from '../About/About';
import Login from '../Auth/Login';
import UserHome from '../Auth/UserHome';
import Courses from '../Courses/Courses';
import Home from '../Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';
import Talks from '../Talks/Talks';

export default function Routes(): ReactElement {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/talks" component={Talks} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={UserHome} />
        <Route exact path="/login" component={Login} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Container>
  );
}
