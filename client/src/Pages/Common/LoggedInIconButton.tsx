import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement, useMemo } from 'react';

import { Size } from './Types';

interface LoggedInIconButtonProps {
  ButtonIcon: typeof AddCircleIcon,
  buttonSize: Size,
  onClick: () => void,
  label: string
}

export default function LoggedInIconButton(
  {
    ButtonIcon, buttonSize, onClick, label,
  }: LoggedInIconButtonProps,
): ReactElement {
  return useMemo(() => (
    <IconButton
      style={{ padding: 5 }}
      color="primary"
      aria-label={label}
      onClick={onClick}
    >
      <ButtonIcon fontSize={buttonSize} />
    </IconButton>
  ), [buttonSize, label, ButtonIcon, onClick]);
}
