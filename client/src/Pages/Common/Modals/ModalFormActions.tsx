import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React, { ReactElement } from 'react';

interface ModalFormActionsProps {
  handleCancel: () => void;
  submitString?: string;
  handleSubmit?: () => void | null;
}

ModalFormActions.defaultProps = {
  submitString: 'save',
  handleSubmit: null,
};

export default function ModalFormActions({
  handleCancel,
  submitString,
  handleSubmit,
}: ModalFormActionsProps): ReactElement {
  return (
    <ButtonGroup
      variant="text"
      style={{ float: 'right', marginTop: 10, marginBottom: 10 }}
    >
      <Button onClick={handleCancel}>Cancel</Button>
      <Button color="secondary" type="submit" onClick={handleSubmit}>
        {submitString}
      </Button>
    </ButtonGroup>
  );
}
