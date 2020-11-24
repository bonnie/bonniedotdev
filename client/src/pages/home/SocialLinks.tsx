import { ButtonGroup } from '@material-ui/core';
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons';
import React, { ReactElement } from 'react';

import SocialLink from './SocialLink';

export default function SocialLinks(): ReactElement {
  const linkedInTarget = 'https://www.linkedin.com/in/bonnie-schulkin/';
  const twitterTarget = 'https://twitter.com/bonniedotdev/';
  const githubTarget = 'http://github.com/bonnie';

  return (
    <ButtonGroup variant="text" aria-label="text primary button group social-media">
      <SocialLink icon={<LinkedIn />} target={linkedInTarget} label="linked-in" />
      <SocialLink icon={<Twitter />} target={twitterTarget} label="twitter" />
      <SocialLink icon={<GitHub />} target={githubTarget} label="github" />
    </ButtonGroup>
  );
}
