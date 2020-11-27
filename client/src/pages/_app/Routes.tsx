import './App.css';

import Container from '@material-ui/core/Container';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from '../about/About';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import UserHome from '../auth/UserHome';
import Courses from '../courses/Courses';
import Home from '../home/Home';
import PageNotFound from '../notFound/PageNotFound';

export default function App(): ReactElement {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/about" component={About} />
        <Route path="/user" component={UserHome} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Container>
  );
}
