import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { ReactElement, useState } from 'react';

interface EditButtonsProps {
  handleDelete: () => void,
  deleteItemString: string,
}

export default function EditButtons(
  { handleDelete, deleteItemString }: EditButtonsProps,
): ReactElement {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = (confirmed: boolean): void => {
    // close the dialog
    setConfirmationOpen(false);

    // trigger the delete if the user confirmed
    if (confirmed) handleDelete();
  };

  const dialogMessage = `Are you sure you want to delete this ${deleteItemString}?`;
  return (
    <>
      <Box style={{ float: 'right' }}>
        <ButtonGroup>
          <IconButton type="submit" color="primary"><CloudUploadIcon /></IconButton>
          <IconButton color="primary" onClick={() => setConfirmationOpen(true)}><DeleteForeverIcon /></IconButton>
        </ButtonGroup>
      </Box>

      <Dialog onClose={handleClose} aria-labelledby="confirm-action" open={confirmationOpen}>
        <Box m={2}>
          <DialogTitle id="confirm-dialog-title">{dialogMessage}</DialogTitle>
          <ButtonGroup
            variant="text"
            style={{ float: 'right' }}
          >
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button color="secondary" onClick={() => handleClose(true)}>Confirm</Button>
          </ButtonGroup>
        </Box>
      </Dialog>
    </>
  );
}
