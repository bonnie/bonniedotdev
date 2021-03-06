import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import React, { ReactElement } from 'react';

type SocialLinkProps = {
  Icon: typeof SvgIcon;
  target: string;
  label: string;
};

export default function SocialLink({
  Icon,
  target,
  label,
}: SocialLinkProps): ReactElement {
  return (
    <IconButton
      key={label}
      aria-label={label}
      title={label}
      color="primary"
      href={target}
      target="_blank"
      rel="noreferrer"
    >
      <Icon />
    </IconButton>
  );
}
