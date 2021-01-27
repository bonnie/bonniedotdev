import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { ReactElement, useState } from 'react';

import { Size } from './Types';

interface DeleteItemModalProps {
  handleDelete: () => void,
  itemLabel: string, // the name of the individual item being deleted
  buttonSize?: Size,
}

DeleteItemModal.defaultProps = {
  buttonSize: 'small',
};

// eslint-disable-next-line max-lines-per-function
export default function DeleteItemModal(
  {
    handleDelete, itemLabel, buttonSize,
  }: DeleteItemModalProps,
): ReactElement {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = (confirmed: boolean): void => {
    // close the dialog
    setConfirmationOpen(false);

    // trigger the delete if the user confirmed
    if (confirmed) handleDelete();
  };

  const dialogMessage = `Are you sure you want to delete this ${itemLabel}?`;

  return (
    <>
      <IconButton
        color="primary"
        aria-label={`Delete ${itemLabel}`}
        onClick={() => setConfirmationOpen(true)}
      >
        <DeleteForeverIcon fontSize={buttonSize} />
      </IconButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby="confirm-action"
        open={confirmationOpen}
      >
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
