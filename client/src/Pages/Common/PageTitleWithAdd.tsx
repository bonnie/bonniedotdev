/* eslint-disable react-hooks/exhaustive-deps */
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useAxiosLater from 'Hooks/useAxiosLater';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement, useMemo } from 'react';
import { NewItem } from 'Types';

import AddItemButton from './Modals/AddItemButton';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: 'inline',
      marginRight: 10,
    },
    divider: {
      width: '10%',
      marginBottom: 20,
    },
    titleLine: {
      display: 'flex',
      alignItems: 'baseline',
    },
  }),
);
interface PageTitleWithAddProps {
  title: string;
  itemEndpoint: string;
  ItemFieldsComponent: ReactElement;
  itemString: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
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
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const axios = useAxiosLater();

  const addButton = useMemo(() => {
    if (!user) return null;
    const addItem = (newData: NewItem) => {
      axios(itemEndpoint, { method: 'POST', data: newData });
    };
    return (
      <AddItemButton
        handleSave={addItem}
        ItemFieldsComponent={ItemFieldsComponent}
        itemString={itemString}
      />
    );
  }, [user]);

  return (
    <>
      <span className={classes.titleLine}>
        <Typography className={classes.header} variant={variant} gutterBottom>
          {title}
        </Typography>
        {addButton}
      </span>
      <Divider variant="fullWidth" className={classes.divider} />
    </>
  );
}
