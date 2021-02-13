import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement } from 'react';
import { NewItem } from 'Types';

import ItemModal from './ItemModal';

interface AddItemButtonProps {
  handleSave: (item: NewItem) => void;
  itemString: string;
  ItemFieldsComponent: ReactElement; // TODO: can we make this more specific as an input field?
}

export default function AddItemButton({
  handleSave,
  itemString,
  ItemFieldsComponent,
}: AddItemButtonProps): ReactElement {
  return (
    <ItemModal
      ButtonIcon={AddCircleIcon}
      handleSave={handleSave}
      dialogTitle={`Add ${itemString}`}
      ItemFields={ItemFieldsComponent}
    />
  );
}
