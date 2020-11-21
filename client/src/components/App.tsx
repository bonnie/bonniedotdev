import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import theme from '../theme';
import Nav from './nav/Nav';
import Routes from './Routes';

export default function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Toolbar>
          <Nav />
        </Toolbar>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
