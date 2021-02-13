import EditIcon from '@material-ui/icons/Edit';
import React, { ReactElement } from 'react';
import { Item } from 'Types';

import ItemModal from './ItemModal';

interface EditItemModalProps<NewItem, ExistingItem extends Item> {
  itemString: string;
  ItemFieldsComponent: ReactElement;
  handleSave: (item: NewItem) => void;
  itemData: ExistingItem;
}

// TODO: ts: ExistingItem extends Item *and* NewItem
export default function EditItemButtons<NewItem, ExistingItem extends Item>({
  itemString,
  ItemFieldsComponent,
  handleSave,
  itemData,
}: EditItemModalProps<NewItem, ExistingItem>): ReactElement {
  // add ID as hidden field
  const ItemFieldsPlusId = (
    <>
      <input type="hidden" name="id" value={itemData.id} />
      {ItemFieldsComponent}
    </>
  );

  return (
    <ItemModal
      ButtonIcon={EditIcon}
      handleSave={handleSave}
      dialogTitle={`Edit ${itemString}`}
      ItemFields={ItemFieldsPlusId}
    />
  );
}
