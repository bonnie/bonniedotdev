import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearAlert } from '../../redux/actions';

export default function AlertBox(): ReactElement {
  const dispatch = useDispatch();
  const { message, alertType } = useSelector((state) => {
    if (state.alert) return state.alert;
    return { message: null, alertType: null };
  });

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
      open={message !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      action={(
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
    )}
    >
      <Alert onClose={handleClose} severity={alertType}>
        {message}
      </Alert>
    </Snackbar>
  );
}
