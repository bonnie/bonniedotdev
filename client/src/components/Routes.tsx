import './App.css';

import Container from '@material-ui/core/Container';
import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import About from './about/About';
import Courses from './courses/Courses';
import Home from './home/Home';

export default function App(): ReactElement {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/about" component={About} />
      </Switch>
    </Container>
  );
}
