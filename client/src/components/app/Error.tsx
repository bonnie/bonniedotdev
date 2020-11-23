import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearError } from '../../redux/actions';

export default function Error(): (ReactElement) {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(clearError());
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={(
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    </div>
  );
}
