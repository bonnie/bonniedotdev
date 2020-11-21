import { IconButton } from '@material-ui/core';
import React from 'react';

type SocialLinkProps = {
  icon: JSX.Element, // TODO: make more specific to a MUI icon component
  target: string,
  label: string
};

export default function SocialLink({ icon, target, label }: SocialLinkProps) {
  return (
    <IconButton
      key={label}
      aria-label={label}
      href={target}
      target="_blank"
      rel="noreferrer"
    >
      {icon}
    </IconButton>
  );
}
