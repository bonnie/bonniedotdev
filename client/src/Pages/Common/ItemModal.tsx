import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { getFormData } from 'Helpers';
import React, { ReactElement, useState } from 'react';

import { Size } from './Types';

interface ItemModalProps {
  ButtonIcon: typeof AddCircleIcon,
  handleSave: (TalkType) => void,
  dialogTitle: string,
  ItemFields: ReactElement, // TODO: can we make this more specific as an input field?
  buttonSize?: Size,
}

ItemModal.defaultProps = {
  buttonSize: 'small',
};

// eslint-disable-next-line max-lines-per-function
export default function ItemModal(
  {
    ButtonIcon, handleSave, dialogTitle, ItemFields, buttonSize,
  }: ItemModalProps,
): ReactElement {
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
      <IconButton
        color="primary"
        aria-label={dialogTitle}
        onClick={() => setModalOpen(true)}
      >
        <ButtonIcon fontSize={buttonSize} />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="confirm-action" open={modalOpen}>
        <Box m={2}>
          <Typography variant="h3" align="center" id="confirm-dialog-title">{dialogTitle}</Typography>
          <form onSubmit={handleSubmit}>
            {ItemFields}
            <ButtonGroup
              variant="text"
              style={{ float: 'right', marginTop: 10, marginBottom: 10 }}
            >
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button color="secondary" type="submit">Save</Button>
            </ButtonGroup>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
