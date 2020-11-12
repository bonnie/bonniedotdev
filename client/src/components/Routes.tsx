import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './App.css';
import Home from './Home';
import Courses from './Courses';
import About from './About';

export default function App() {
  const { pathname } = window.location;
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="home" value="/" component={Link} to="/" />
          <Tab label="courses" value="/courses" component={Link} to="/courses" />
          <Tab label="about" value="/about" component={Link} to="/about" />
        </Tabs>
      </Paper>
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/about" component={About} />
        </Switch>
      </Container>
    </>
  );
}
