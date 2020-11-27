import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import urls from '../../constants/urls';
import { setUser } from '../../redux/actions';
import useAxios from '../../redux/hooks/useAxios';
import { axiosMethodEnum } from '../../types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
  },
}));

// eslint-disable-next-line max-lines-per-function
export default function Login(): ReactElement {
  const classes = useStyles();
  const callServer = useAxios();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = event.target.value;
    // TODO: abstract this out to an action using Redux Thunk (or Saga)
    const responseData = await callServer(
      dispatch,
      { url: urls.loginURL, method: axiosMethodEnum.POST, data: formData },
    );

    // this will re-render and redirect to auth
    if (responseData !== null) dispatch(setUser(responseData));
  };

  // if someone manually enters the url while logged in, or state changes, redirect to auth
  if (user) {
    return <Redirect to="/user" />;
  }

  return (
    <>
      <Typography variant="h1">Log In</Typography>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

        <TextField required id="username" label="Username" />

        <TextField
          required
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Box m={2}>
          <Button variant="contained" type="submit" color="secondary">
            Log in
          </Button>
        </Box>
      </form>
    </>
  );
}
