import Box from '@material-ui/core/Box';
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
      <Box m={2}>
        <DialogTitle id="confirm-dialog-title">{message}</DialogTitle>
        <ButtonGroup
          variant="text"
          style={{ float: 'right' }}
        >
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button color="secondary" onClick={() => handleClose(true)}>Confirm</Button>
        </ButtonGroup>
      </Box>
    </Dialog>
  );
}
