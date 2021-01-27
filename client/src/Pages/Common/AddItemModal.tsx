import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement } from 'react';

import ItemModal from './ItemModal';
import { ItemType, Size } from './Types';

interface AddItemModalProps {
  handleSave: (item: ItemType) => void,
  itemString: string,
  ItemFields: ReactElement, // TODO: can we make this more specific as an input field?
  buttonSize?: Size,
}

AddItemModal.defaultProps = {
  buttonSize: 'small',
};

export default function AddItemModal({
  handleSave, itemString, ItemFields, buttonSize,
}: AddItemModalProps): ReactElement {
  return (
    <ItemModal
      ButtonIcon={AddCircleIcon}
      handleSave={handleSave}
      dialogTitle={`Add ${itemString}`}
      ItemFields={ItemFields}
      buttonSize={buttonSize}
    />
  );
}
