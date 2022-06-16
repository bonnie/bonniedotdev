import ButtonGroup from '@material-ui/core/ButtonGroup';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import React, { ReactElement } from 'react';

import DevToIcon from './DevToIcon';
import SocialLink from './SocialLink';

export default function SocialLinks(): ReactElement {
  const linkedInTarget = 'https://www.linkedin.com/in/bonnie-schulkin/';
  const twitterTarget = 'https://twitter.com/bonniedotdev/';
  const githubTarget = 'http://github.com/bonnie';
  const devToTarget = 'https://dev.to/bonnie';

  return (
    <ButtonGroup
      variant="text"
      aria-label="text primary button group social-media"
    >
      <SocialLink
        Icon={LinkedInIcon}
        target={linkedInTarget}
        label="LinkedIn"
      />
      <SocialLink Icon={TwitterIcon} target={twitterTarget} label="Twitter" />
      <SocialLink Icon={GitHubIcon} target={githubTarget} label="GitHub" />
      <SocialLink Icon={DevToIcon} target={devToTarget} label="dev.to" />
    </ButtonGroup>
  );
}
