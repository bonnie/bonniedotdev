import EditIcon from '@material-ui/icons/Edit';
import React, { ReactElement } from 'react';

import { Size } from '../Types';
import ItemModal from './ItemModal';

interface EditItemModalProps {
  handleSave: (TalkType) => void;
  itemString: string;
  ItemFields: ReactElement;
  id: number;
  buttonSize?: Size;
}

EditItemModal.defaultProps = {
  buttonSize: 'small',
};

export default function EditItemModal({
  handleSave,
  itemString,
  ItemFields,
  id,
  buttonSize,
}: EditItemModalProps): ReactElement {
  // add ID as hidden field
  const ItemFieldsPlusId = (
    <>
      <input type="hidden" name="id" value={id} />
      {ItemFields}
    </>
  );

  return (
    <ItemModal
      ButtonIcon={EditIcon}
      handleSave={handleSave}
      dialogTitle={`Edit ${itemString}`}
      ItemFields={ItemFieldsPlusId}
      buttonSize={buttonSize}
    />
  );
}
