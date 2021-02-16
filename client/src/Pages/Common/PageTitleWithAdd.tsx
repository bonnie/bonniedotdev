/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from 'AxiosInstance';
import useQueryMutation from 'Hooks/useQueryMutation';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement, useMemo } from 'react';
import { HeaderVariant, itemEditDetails, ItemType, NewItem } from 'Types';

import AddItemButton from './Modals/AddItemButton';
import PageTitle from './PageTitle';

interface PageTitleWithAddProps {
  title: string;
  variant?: HeaderVariant;
  itemDetails: itemEditDetails;
  ItemFieldsComponent: ReactElement;
  queryIdentifier?: ItemType;
}

PageTitleWithAdd.defaultProps = {
  variant: 'h1',
  queryIdentifier: null,
};

export default function PageTitleWithAdd({
  title,
  variant,
  itemDetails,
  ItemFieldsComponent,
  queryIdentifier,
}: PageTitleWithAddProps): ReactElement {
  const user = useSelector((state) => state.user);
  const identifier = queryIdentifier || itemDetails.itemIdentifier;

  const addItem = (newData: NewItem) =>
    axiosInstance({ url: itemDetails.editUrl, method: 'POST', data: newData });

  const addMutation = useQueryMutation<NewItem>({
    identifier,
    mutationFn: addItem,
    actionString: 'add',
  });

  const addButton = useMemo(() => {
    if (!user) return null;

    return (
      <AddItemButton
        handleSave={addMutation.mutate}
        itemDetails={itemDetails}
        ItemFieldsComponent={ItemFieldsComponent}
      />
    );
  }, [user]);

  return <PageTitle title={title} variant={variant} addButton={addButton} />;
}
