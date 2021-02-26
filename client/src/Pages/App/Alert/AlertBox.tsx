/* eslint-disable react/jsx-wrap-multilines */
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import useActions from 'Hooks/useActions';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement } from 'react';
import { RootState } from 'State';

function getMessageAndAlertLevel(state: RootState) {
  if (state.alert) return state.alert;
  return { message: null, alertLevel: null };
}

// eslint-disable-next-line max-lines-per-function
export default function AlertBox(): ReactElement | null {
  const { clearAlert } = useActions();
  const { message, alertLevel } = useSelector(getMessageAndAlertLevel);

  // if there's no alert, nothing to see here
  if (message === null && alertLevel === null) return null;

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    clearAlert();
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
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert onClose={handleClose} severity={alertLevel || undefined}>
        {message}
      </Alert>
    </Snackbar>
  );
}
