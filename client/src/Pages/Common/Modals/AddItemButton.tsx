import AddCircleIcon from '@material-ui/icons/AddCircle';
import React, { ReactElement } from 'react';
import { itemEditDetails, NewItem } from 'Types';

import ItemModal from './ItemModal';

interface AddItemButtonProps {
  handleSave: (item: NewItem) => void;
  itemDetails: itemEditDetails;
  ItemFieldsComponent: ReactElement;
}

export default function AddItemButton({
  handleSave,
  itemDetails,
  ItemFieldsComponent,
}: AddItemButtonProps): ReactElement {
  return (
    <ItemModal
      ButtonIcon={AddCircleIcon}
      handleSave={handleSave}
      dialogTitle={`Add ${itemDetails.itemString}`}
      ItemFields={ItemFieldsComponent}
    />
  );
}
