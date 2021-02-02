import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

interface PageTitleWithAddProps {
  title: string;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  AddButton: ReactElement;
}

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

export default function PageTitleWithAdd({
  title,
  variant,
  AddButton,
}: PageTitleWithAddProps): ReactElement {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  return (
    <>
      <span className={classes.titleLine}>
        <Typography className={classes.header} variant={variant} gutterBottom>
          {title}
        </Typography>
        {user && AddButton ? AddButton : null}
      </span>
      <Divider variant="fullWidth" className={classes.divider} />
    </>
  );
}
