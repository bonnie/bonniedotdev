/* eslint-disable react-hooks/exhaustive-deps */
import useAxiosLater from 'Hooks/useAxiosLater';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement, useMemo } from 'react';
import { HeaderVariant, itemEditDetails, NewItem } from 'Types';

import AddItemButton from './Modals/AddItemButton';
import PageTitle from './PageTitle';

interface PageTitleWithAddProps {
  title: string;
  variant?: HeaderVariant;
  itemDetails: itemEditDetails;
  ItemFieldsComponent: ReactElement;
}

PageTitleWithAdd.defaultProps = {
  variant: 'h1',
};

export default function PageTitleWithAdd({
  title,
  variant,
  itemDetails,
  ItemFieldsComponent,
}: PageTitleWithAddProps): ReactElement {
  const user = useSelector((state) => state.user);
  const axios = useAxiosLater();

  const addButton = useMemo(() => {
    if (!user) return null;
    const addItem = (newData: NewItem) => {
      axios({ url: itemDetails.editUrl, method: 'POST', data: newData });
    };
    return (
      <AddItemButton
        handleSave={addItem}
        itemDetails={itemDetails}
        ItemFieldsComponent={ItemFieldsComponent}
      />
    );
  }, [user]);

  return <PageTitle title={title} variant={variant} addButton={addButton} />;
}
