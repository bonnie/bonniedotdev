import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement } from 'react';

interface addButtonProps {
  onClick: (event) => void
}

export default function addButton({ onClick }: addButtonProps): ReactElement {
  return (
    <Grid item>
      <IconButton onClick={onClick}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
    </Grid>
  );
}
