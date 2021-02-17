import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useActions from 'Hooks/useActions';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement } from 'react';
import { Redirect } from 'react-router-dom';

export default function UserHome(): ReactElement {
  const { logoutUser } = useActions();
  const user = useSelector((state) => state.user);

  // if we somehow got here and the user is null, just redirect to login
  if (user === null) return <Redirect to="login" />;

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Welcome {user.username}
      </Typography>
      <Box m={2}>
        <Button variant="contained" color="secondary" onClick={logoutUser}>
          Log out
        </Button>
      </Box>
    </Box>
  );
}
