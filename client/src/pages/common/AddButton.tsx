import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement } from 'react';

// TODO: can I import this from somewhere...?
type Size = 'small' | 'inherit' | 'large' | 'default' | undefined

interface addButtonProps {
  onClick: (event) => void
  size?: Size
}

AddButton.defaultProps = { size: 'large' };

export default function AddButton({ onClick, size }: addButtonProps): ReactElement {
  return (
    <Grid item>
      <IconButton onClick={onClick}>
        <AddCircleIcon fontSize={size} />
      </IconButton>
    </Grid>
  );
}
