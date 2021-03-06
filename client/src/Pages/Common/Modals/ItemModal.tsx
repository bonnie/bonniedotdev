import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getFormData } from 'Helpers';
import React, { ReactElement, useState } from 'react';

import LoggedInIconButton from '../LoggedInIconButton';
import ModalFormActions from './ModalFormActions';

interface ItemModalProps {
  ButtonIcon: typeof AddCircleIcon;
  handleSave: (TalkType) => void;
  dialogTitle: string;
  ItemFields: ReactElement; // TODO: can we make this more specific as an input field?
}

// eslint-disable-next-line max-lines-per-function
export default function ItemModal({
  ButtonIcon,
  handleSave,
  dialogTitle,
  ItemFields,
}: ItemModalProps): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = (): void => setModalOpen(false);

  function handleSubmit(event): void {
    // close the dialog
    setModalOpen(false);

    // gather data from the form
    event.preventDefault();
    const formData = getFormData(event);
    handleSave(formData);
  }

  return (
    <>
      <LoggedInIconButton
        label={dialogTitle}
        onClick={() => setModalOpen(true)}
        ButtonIcon={ButtonIcon}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby="confirm-action"
        open={modalOpen}
      >
        <Box m={2}>
          <Typography variant="h3" align="center" id="confirm-dialog-title">
            {dialogTitle}
          </Typography>
          <form onSubmit={handleSubmit}>
            {ItemFields}
            <ModalFormActions handleCancel={handleClose} />
          </form>
        </Box>
      </Dialog>
    </>
  );
}
