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
  handleDelete: () => void;
  itemString: string;
  updateButton?: boolean;
  itemLabel: string;
}

EditButtons.defaultProps = {
  updateButton: true,
};

// eslint-disable-next-line max-lines-per-function
export default function EditButtons({
  handleDelete,
  itemString,
  updateButton,
  itemLabel,
}: EditButtonsProps): ReactElement {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleClose = (confirmed: boolean): void => {
    // close the dialog
    setConfirmationOpen(false);

    // trigger the delete if the user confirmed
    if (confirmed) handleDelete();
  };

  const dialogMessage = `Are you sure you want to delete this ${itemString}?`;

  return (
    <>
      <Box style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
        {updateButton ? (
          <IconButton
            type="submit"
            aria-label={`Update ${itemLabel}`}
            color="primary"
          >
            <CloudUploadIcon />
          </IconButton>
        ) : null}
        <IconButton
          color="primary"
          aria-label={`Delete ${itemLabel}`}
          onClick={() => setConfirmationOpen(true)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Box>

      <Dialog
        onClose={handleClose}
        aria-labelledby="confirm-action"
        open={confirmationOpen}
      >
        <Box m={2}>
          <DialogTitle id="confirm-dialog-title">{dialogMessage}</DialogTitle>
          <ButtonGroup variant="text" style={{ float: 'right' }}>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button color="secondary" onClick={() => handleClose(true)}>
              Confirm
            </Button>
          </ButtonGroup>
        </Box>
      </Dialog>
    </>
  );
}
