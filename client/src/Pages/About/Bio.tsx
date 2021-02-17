import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PageTitle from 'Pages/Common/PageTitle';
import React, { ReactElement } from 'react';

export default function Bio(): ReactElement {
  return (
    <Box component="section" mb={4}>
      <PageTitle title="About Bonnie" />
      <Typography style={{ fontSize: 16, fontWeight: 500 }}>
        Bonnie&apos;s wide range of past positions includes high school physics
        teacher, education programs at a planetarium, developer support
        engineer, coding boot camp instructor, and engineer for developer
        infrastructure (specifically test frameworks). All of her favorite jobs
        have involved explaining technical concepts in some form, and she&apos;s
        pleased as punch to be producing online content full-time. She feels
        weird writing about herself in the third person.
      </Typography>
    </Box>
  );
}
