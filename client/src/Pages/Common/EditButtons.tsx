import urls from 'Constants/urls';
import jsonpatch from 'fast-json-patch';
import useAxiosLater from 'Hooks/useAxiosLater';
import useLogger from 'Hooks/useLogger';
import useSelector from 'Hooks/useTypedSelector';
import DeleteItemButton from 'Pages/Common/Modals/_DeleteItemButton';
import EditItemButton from 'Pages/Common/Modals/_EditItemButtons';
import React, { ReactElement } from 'react';
import { Item } from 'Types';
import _ from 'underscore';

interface EditItemButtonsProps<NewItem, ExistingItem extends Item & NewItem> {
  itemString: string;
  itemData: ExistingItem;
  itemEndpoint: urls;
  patchRelevantKeys: string[];
  ItemFieldsComponent: ReactElement;
}

export default function EditItemButtons<
  NewItem,
  ExistingItem extends Item & NewItem
>({
  itemString,
  itemData,
  itemEndpoint,
  patchRelevantKeys,
  ItemFieldsComponent,
}: EditItemButtonsProps<NewItem, ExistingItem>): ReactElement | null {
  const logger = useLogger();
  const axios = useAxiosLater();
  const user = useSelector((state) => state.user);

  if (!user) return null;

  function handleSave(newData: NewItem) {
    const originalPatchData = _.pick(itemData, ...patchRelevantKeys);
    const newPatchData = _.pick(newData, ...patchRelevantKeys);

    // create a patch for the difference between newData and originalData
    const patch = jsonpatch.compare(originalPatchData, newPatchData);

    // edit was called with no differences
    if (patch.length === 0) {
      logger('error', `update ${itemEndpoint} was called with no differences`);
    }
  }

  function handleDelete() {
    axios(`${itemEndpoint}/${itemData.id}`, { method: 'DELETE' });
  }
  return (
    <>
      <EditItemButton
        ItemFieldsComponent={ItemFieldsComponent}
        handleSave={handleSave}
        itemData={itemData}
        itemString={itemString}
      />
      {/** TODO: work out what to do about itemLabel */}
      <DeleteItemButton
        itemLabel="TODO"
        itemTypeString={itemString}
        handleDelete={handleDelete}
      />
    </>
  );
}
