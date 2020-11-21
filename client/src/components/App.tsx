import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import theme from '../theme';
import Nav from './nav/Nav';
import Routes from './Routes';

export default function App() {
  // separate routes out for easier testing
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Nav />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
