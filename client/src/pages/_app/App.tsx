import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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
      <BrowserRouter>
        <Toolbar>
          <Nav />
        </Toolbar>
        <Box m={5}>
          <Routes />
        </Box>
      </BrowserRouter>
    </ThemeProvider>

  );
}
