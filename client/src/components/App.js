import { Box, Container } from '@material-ui/core';

import './App.css';
import Footer from './Footer';


function App() {
  return (
        <Container className="body-home main">
          <Box><h1>Bonnie Schulkin</h1></Box>
          <Box><h3 className="code">teacher | coder</h3></Box>

          <Footer />
        </Container>
  );
}

export default App;
