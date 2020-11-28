import './App.css';

import Container from '@material-ui/core/Container';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from '../about/About';
import Login from '../auth/Login';
import Logout from '../auth/Logout';
import UserHome from '../auth/UserHome';
import Courses from '../courses/Courses';
import EditCourse from '../courses/EditCourse';
import Home from '../home/Home';
import PageNotFound from '../notFound/PageNotFound';
import PrivateRoute from './PrivateRoute';

export default function App(): ReactElement {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/courses/edit/:id" component={EditCourse} />
        <PrivateRoute exact path="/courses/new" component={EditCourse} />
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={UserHome} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Container>
  );
}
