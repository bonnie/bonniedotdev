import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { logoutUser } from './Redux/Actions';

export default function UserHome(): ReactElement {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  // if we somehow got here and the user is null, just redirect to login
  if (user === null) return <Redirect to="login" />;

  const handleLogout = () => {
    // TODO: make this cleaner with action creator function?
    dispatch(logoutUser());
    history.push('/login');
  };

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Welcome {user.username}
      </Typography>
      <Box m={2}>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Log out
        </Button>
      </Box>
    </Box>
  );
}
