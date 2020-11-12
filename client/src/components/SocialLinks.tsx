import React from 'react';
import { ButtonGroup } from '@material-ui/core';
import { LinkedIn, Twitter, GitHub } from '@material-ui/icons';
import SocialLink from './SocialLink';

export default function SocialLinks() {
  const linkedInTarget = 'https://www.linkedin.com/in/bonnie-schulkin/';
  const twitterTarget = 'https://twitter.com/bonniedotdev/';
  const githubTarget = 'http://github.com/bonnie';

  return (
    <ButtonGroup variant="text" aria-label="text primary button group">
      <SocialLink icon={<LinkedIn />} target={linkedInTarget} label="linked in" />
      <SocialLink icon={<Twitter />} target={twitterTarget} label="twitter" />
      <SocialLink icon={<GitHub />} target={githubTarget} label="github" />
    </ButtonGroup>
  );
}
