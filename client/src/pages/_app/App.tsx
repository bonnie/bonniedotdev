import Box from '@material-ui/core/Box';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import theme from '../../theme';
import AlertBox from './AlertBox';
import LoadingSpinner from './LoadingSpinner';
import Nav from './Nav';
import Routes from './Routes';

export default function App(): ReactElement {
  const loading = useSelector((state) => state.loading);
  return (
    <ThemeProvider theme={theme}>
      { loading ? <LoadingSpinner /> : null }
      <AlertBox />
      <Toolbar>
        <Nav />
      </Toolbar>
      <Box m={5}>
        <Routes />
      </Box>
    </ThemeProvider>
  );
}
