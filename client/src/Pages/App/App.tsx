import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import theme from 'Theme';

import AlertBox from './Alert/AlertBox';
import LoadingSpinner from './Loading/LoadingSpinner';
import Nav from './Nav';
import Routes from './Routes';

export default function App(): ReactElement {
  const loading = useSelector((state) => state.loading);
  return (
    <ThemeProvider theme={theme}>
      <AlertBox />
      <Toolbar>
        <Nav />
      </Toolbar>
      <Box m={5}>
        {loading ? <LoadingSpinner /> : null}
        <Routes />
      </Box>
    </ThemeProvider>
  );
}
