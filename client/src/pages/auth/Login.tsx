import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import urls from '../../constants/urls';
import { getFormData } from '../../helpers';
import { actionIds, setAlert, setUser } from '../../redux/actions';
import { AlertTypeOptions, axiosMethodEnum } from '../../types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(3),
      width: '25ch',
    },
  },
}));

interface LoginPropsType {
  referrer: string | null,
}

// eslint-disable-next-line max-lines-per-function
export default function Login({ referrer = null }: LoginPropsType): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = getFormData(event);

    // TODO: abstract this out to an action using Redux Thunk (or Saga)
    dispatch({
      type: actionIds.LOGIN_USER,
      payload: { data: formData },
    });
  };

  // if someone manually enters the url while logged in, or state changes, redirect to auth
  if (user) {
    const redirect = referrer || '/user';
    return <Redirect to={redirect} />;
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
