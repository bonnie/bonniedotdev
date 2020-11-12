import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './App.css';
import Home from './Home';
import Courses from './Courses';
import About from './About';

// export default function App() {
//   // material-ui + react router = 😭
//   // https://stackoverflow.com/a/51229652
//   return (
//     <Route
//       path="/"
//       render={({ location }) => (
//         <>
//           <Paper>
//             <Tabs value={location.pathname}>
//               <Tab label="home" value="/" component={Link} to="/" />
//               <Tab label="courses" value="/courses" component={Link} to="/courses" />
//               <Tab label="about" value="/about" component={Link} to="/about" />
//             </Tabs>
//           </Paper>
//           <Switch>
//             <Route path="/" render={() => <Home />} />
//             <Route path="/courses" render={() => <Courses />} />
//             <Route path="/about" render={() => <About />} />
//           </Switch>
//         </>
//       )}
//     />
//   );
// }

/*
  <BottomNavigation value={value} onChange={this.handleChange}>
    <BottomNavigationAction
      component={Link}
      to="/signal"
      label="signal"
      value="signal"
      icon={<ShowChart />}
      className={classes.content}
    />
  </BottomNavigation>;
  */

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
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses" component={Courses} />
        <Route path="/about" component={About} />
      </Switch>
    </>
  );
}
