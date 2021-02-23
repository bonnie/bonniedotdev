import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { ReactElement, useState } from 'react';

import LoggedInIconButton from '../LoggedInIconButton';
import ModalFormActions from './ModalFormActions';

interface DeleteItemModalProps {
  handleDelete: () => void;
  itemLabel: string; // the name of the individual item being deleted
  itemTypeString: string; // the name of the type of item being deleted
}

// eslint-disable-next-line max-lines-per-function
export default function DeleteItemModal({
  handleDelete,
  itemLabel,
  itemTypeString,
}: DeleteItemModalProps): ReactElement {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = (confirmed: boolean): void => {
    // close the dialog
    setConfirmationOpen(false);

    // trigger the delete if the user confirmed
    if (confirmed) handleDelete();
  };

  const dialogMessage = `Are you sure you want to delete ${itemLabel}?`;

  return (
    <>
      <LoggedInIconButton
        label={`Delete ${itemTypeString}`}
        onClick={() => setConfirmationOpen(true)}
        ButtonIcon={DeleteForeverIcon}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="confirm-action"
        open={confirmationOpen}
      >
        <Box m={2}>
          <DialogTitle id="confirm-dialog-title">{dialogMessage}</DialogTitle>
          <ModalFormActions
            handleCancel={() => handleClose(false)}
            handleSubmit={() => handleClose(true)}
            submitString="Confirm"
          />
        </Box>
      </Dialog>
    </>
  );
}
