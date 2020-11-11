import React from 'react';
import { Box, Container } from '@material-ui/core';

import './App.css';
import SocialLinks from './SocialLinks';

/**
 * Functional top-level React component
 * @function App
 *
 * @returns {jsx} component JSX
 */
function App() {
  return (
    <Container className="body-home main">
      <Box>
        <h1>Bonnie Schulkin</h1>
      </Box>
      <Box>
        <h3 className="code">teacher | coder</h3>
      </Box>
      <SocialLinks />
    </Container>
  );
}

export default App;
