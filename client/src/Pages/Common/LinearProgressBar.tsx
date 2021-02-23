import { Box, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import React, { ReactElement } from 'react';

// const BorderLinearProgress = withStyles((theme) => ({
//   root: {
//     height: 15,
//     borderRadius: 5,
//   },
//   colorPrimary: {
//     backgroundColor: '#EEEEEE',
//   },
//   bar: {
//     borderRadius: 5,
//     backgroundColor: '#1a90ff',
//   },
// }))(LinearProgress);

interface LinearProgressBarProps {
  progress: number;
  errorMessage: string | null;
}

export default function LinearProgressBar({
  progress,
  errorMessage,
}: LinearProgressBarProps): ReactElement {
  return (
    <>
      <Typography style={{ color: 'firebrick' }}>{errorMessage}</Typography>
      <Box display={progress > 0 ? 'flex' : 'none'} alignItems="center">
        <Box width="100%">
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">
            {`${progress}%`}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
