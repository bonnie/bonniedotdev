import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { ReactElement } from 'react';

interface ConfirmationDialogProps {
  open: boolean,
  handleClose: (boolean) => void,
  message: string,
}

export default function ConfirmationDialog({
  open, handleClose, message,
}: ConfirmationDialogProps): ReactElement {
  return (
    <Dialog onClose={handleClose} aria-labelledby="confirm-action" open={open}>
      <DialogTitle id="confirm-dialog-title">{message}</DialogTitle>
      <ButtonGroup>
        <Button variant="outlined" onClick={() => handleClose(false)}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={() => handleClose(true)}>Confirm</Button>
      </ButtonGroup>
    </Dialog>
  );
}
