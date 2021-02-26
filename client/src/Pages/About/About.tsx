import Box from '@material-ui/core/Box';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import Bio from './Bio';
import ReviewQuotes from './ReviewQuotes/ReviewQuotes';

export default function About(): ReactElement {
  return (
    <Box>
      <Helmet>
        <title>Bonnie Schulkin | About Bonnie</title>
        <meta name="description" content="What people say about Bonnie" />
      </Helmet>
      <Bio />
      <ReviewQuotes />
    </Box>
  );
}
