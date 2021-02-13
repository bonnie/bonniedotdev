import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement, useMemo } from 'react';

interface LoggedInIconButtonProps {
  ButtonIcon: typeof AddCircleIcon;
  onClick: () => void;
  label: string;
}

export default function LoggedInIconButton({
  ButtonIcon,
  onClick,
  label,
}: LoggedInIconButtonProps): ReactElement {
  return useMemo(
    () => (
      <IconButton
        style={{ padding: 5 }}
        color="primary"
        aria-label={label}
        onClick={onClick}
      >
        <ButtonIcon fontSize="small" />
      </IconButton>
    ),
    [label, ButtonIcon, onClick],
  );
}
