/* eslint-disable react-hooks/exhaustive-deps */
import useAxiosLater from 'Hooks/useAxiosLater';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement, useMemo } from 'react';
import { HeaderVariant, NewItem } from 'Types';

import AddItemButton from './Modals/AddItemButton';
import PageTitle from './PageTitle';

interface PageTitleWithAddProps {
  title: string;
  itemEndpoint: string;
  ItemFieldsComponent: ReactElement;
  itemString: string;
  variant?: HeaderVariant;
}

PageTitleWithAdd.defaultProps = {
  variant: 'h1',
};

export default function PageTitleWithAdd({
  title,
  itemEndpoint,
  ItemFieldsComponent,
  itemString,
  variant,
}: PageTitleWithAddProps): ReactElement {
  const user = useSelector((state) => state.user);
  const axios = useAxiosLater();

  const addButton = useMemo(() => {
    if (!user) return null;
    const addItem = (newData: NewItem) => {
      axios({ url: itemEndpoint, method: 'POST', data: newData });
    };
    return (
      <AddItemButton
        handleSave={addItem}
        ItemFieldsComponent={ItemFieldsComponent}
        itemString={itemString}
      />
    );
  }, [user]);

  return <PageTitle title={title} variant={variant} addButton={addButton} />;
}
