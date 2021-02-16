/* eslint-disable max-lines-per-function */
import jsonpatch from 'fast-json-patch';
import useAxiosLater from 'Hooks/useAxiosLater';
import useLogger from 'Hooks/useLogger';
import useSelector from 'Hooks/useTypedSelector';
import DeleteItemButton from 'Pages/Common/Modals/DeleteItemButton';
import UpdateItemButton from 'Pages/Common/Modals/UpdateItemButton';
import React, { ReactElement } from 'react';
import { Item, itemEditDetails } from 'Types';
import _ from 'underscore';

interface EditItemButtonsProps<NewItem, ExistingItem extends Item & NewItem> {
  itemDetails: itemEditDetails;
  itemData: ExistingItem;
  ItemFieldsComponent: ReactElement;
}

export default function EditItemButtons<
  NewItem,
  ExistingItem extends Item & NewItem
>({
  itemDetails,
  itemData,
  ItemFieldsComponent,
}: EditItemButtonsProps<NewItem, ExistingItem>): ReactElement | null {
  const logger = useLogger();
  const axios = useAxiosLater();
  const user = useSelector((state) => state.user);

  if (!user) return null;

  function handleSave(newData: NewItem) {
    const originalPatchData = _.pick(
      itemData,
      ...itemDetails.patchRelevantKeys,
    );
    const newPatchData = _.pick(newData, ...itemDetails.patchRelevantKeys);

    // create a patch for the difference between newData and originalData
    const patch = jsonpatch.compare(originalPatchData, newPatchData);

    // edit was called with no differences
    if (patch.length === 0) {
      logger(
        'error',
        `update ${itemDetails.editUrl} was called with no differences`,
      );
    }
    axios({
      url: `${itemDetails.editUrl}/${itemData.id}`,
      data: patch,
      method: 'PATCH',
    });
  }

  function handleDelete() {
    axios({
      url: `${itemDetails.editUrl}/${itemData.id}`,
      method: 'DELETE',
    });
  }
  return (
    <>
      <UpdateItemButton
        ItemFieldsComponent={ItemFieldsComponent}
        handleSave={handleSave}
        itemData={itemData}
        itemString={itemDetails.itemString}
      />
      {/** TODO: work out what to do about itemLabel */}
      <DeleteItemButton
        itemLabel="TODO"
        itemTypeString={itemDetails.itemString}
        handleDelete={handleDelete}
      />
    </>
  );
}
