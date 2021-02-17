/* eslint-disable max-lines-per-function */
import axiosInstance from 'AxiosInstance';
import jsonpatch, { Operation } from 'fast-json-patch';
import useLogger from 'Hooks/useLogger';
import useQueryMutation from 'Hooks/useQueryMutation';
import useSelector from 'Hooks/useTypedSelector';
import DeleteItemButton from 'Pages/Common/Modals/DeleteItemButton';
import UpdateItemButton from 'Pages/Common/Modals/UpdateItemButton';
import React, { ReactElement } from 'react';
import { Item, itemEditDetails, ItemType } from 'Types';
import _ from 'underscore';

interface EditItemButtonsProps<NewItem, ExistingItem extends Item & NewItem> {
  itemDetails: itemEditDetails;
  itemData: ExistingItem;
  ItemFieldsComponent: ReactElement;
  queryIdentifier?: ItemType;
}

EditItemButtons.defaultProps = {
  queryIdentifier: null,
};

export default function EditItemButtons<
  NewItem,
  ExistingItem extends Item & NewItem
>({
  itemDetails,
  itemData,
  ItemFieldsComponent,
  queryIdentifier,
}: EditItemButtonsProps<NewItem, ExistingItem>): ReactElement | null {
  const logger = useLogger();
  const user = useSelector((state) => state.user);
  const identifier = queryIdentifier || itemDetails.itemIdentifier;

  const editUrl = `${itemDetails.editUrl}/${itemData.id}`;
  const updateItem = (patch: Operation[]) =>
    axiosInstance({ url: editUrl, data: patch, method: 'PATCH' });
  const updateMutation = useQueryMutation<Operation[]>({
    identifier,
    mutationFn: updateItem,
    actionString: 'update',
  });

  const deleteItem = () =>
    axiosInstance({
      url: `${itemDetails.editUrl}/${itemData.id}`,
      method: 'DELETE',
    });
  const deleteMutation = useQueryMutation<null>({
    identifier,
    mutationFn: deleteItem,
    actionString: 'delete',
  });

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
      return;
    }

    updateMutation.mutate(patch);
  }

  function handleDelete() {
    // TODO: figure out how to get typescript to allow "no argument"
    deleteMutation.mutate(null);
  }

  return (
    <>
      <UpdateItemButton
        ItemFieldsComponent={ItemFieldsComponent}
        handleSave={handleSave}
        itemData={itemData}
        itemString={itemDetails.itemString}
      />
      <DeleteItemButton
        itemLabel={itemDetails.itemString}
        itemTypeString={itemDetails.itemString}
        handleDelete={handleDelete}
      />
    </>
  );
}
