import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { ReactElement, ReactFragment, useState } from 'react';
import { Link } from 'react-router-dom';

// TODO: get this from theme rather than hard-coding
const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    fontFamily: "'Roboto Mono', monospace",
    fontVariant: 'normal',
    textTransform: 'none',
    letterSpacing: '0.1em',
  },
}));

interface NavProps {
  breakpointClass: string;
  homeButton: ReactFragment;
  tabList: string[];
}

export default function NavTabs({
  breakpointClass,
  homeButton,
  tabList,
}: NavProps): ReactElement {
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
  if (nonTabRoutes.test(value)) setValue('/');

  return (
    <Tabs className={breakpointClass} value={value} onChange={handleChange}>
      <Tab
        className={classes.tab}
        label={homeButton}
        value="/"
        component={Link}
        to="/"
      />
      {tabList.map((tabName) => (
        <Tab
          key={tabName}
          className={classes.tab}
          label={tabName}
          value={`/${tabName}`}
          component={Link}
          to={`/${tabName}`}
        />
      ))}
    </Tabs>
  );
}
