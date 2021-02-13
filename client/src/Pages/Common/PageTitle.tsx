import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { HeaderVariant } from 'Types';

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

interface PageTitleProps {
  title: string;
  addButton?: ReactElement | null;
  variant?: HeaderVariant;
}

PageTitle.defaultProps = {
  variant: 'h1',
  addButton: null,
};

export default function PageTitle({
  title,
  variant,
  addButton,
}: PageTitleProps): ReactElement {
  const classes = useStyles();

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
