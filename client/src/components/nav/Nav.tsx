import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import { colors } from '../../theme';

export default function Nav(): ReactElement {
  const { pathname } = window.location;
  const [value, setValue] = useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    background: colors.transparentDarkGrey,
    color: 'white',
  };

  return (
    <Paper square style={style}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" value="/" component={Link} to="/" />
        <Tab label="courses" value="/courses" component={Link} to="/courses" />
        <Tab label="about" value="/about" component={Link} to="/about" />
      </Tabs>
    </Paper>
  );
}
