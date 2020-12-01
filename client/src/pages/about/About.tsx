import Box from '@material-ui/core/Box';
import React, { ReactElement } from 'react';

import Bio from './Bio';
import ReviewQuotes from './ReviewQuotes/ReviewQuotes';

export default function About(): ReactElement {
  return (
    <Box>
      <Bio />
      <ReviewQuotes />
    </Box>
  );
}
