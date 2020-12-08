import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

export default function UserHome(): ReactElement {
  const user = useSelector((state) => state.user);

  // if we somehow got here and the user is null, just redirect to login
  if (user === null) return <Redirect to="login" />;

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        Welcome
        {' '}
        {user.username}
      </Typography>
      <Box m={2}>
        <Button variant="contained" color="secondary" component={Link} to="/logout">Log out</Button>
      </Box>
    </Box>
  );
}
