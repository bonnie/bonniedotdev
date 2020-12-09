import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearAlert } from './Redux/actions';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function AlertBox(): ReactElement | null {
  const dispatch = useDispatch();
  const { message, alertLevel } = useSelector((state) => {
    if (state.alert) return state.alert;
    return { message: null, alertLevel: null };
  });

  // if there's no alert, nothing to see here
  if (message === null && alertLevel === null) return null;

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(clearAlert());
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open
      autoHideDuration={6000}
      onClose={handleClose}
      action={(
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
    )}
    >
      <Alert onClose={handleClose} severity={alertLevel}>
        {message}
      </Alert>
    </Snackbar>
  );
}
