import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { getFormData } from 'Helpers';
import useActions from 'Hooks/useActions';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement } from 'react';
import { Redirect } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '25ch',
      },
    },
  }),
);

interface LoginPropsType {
  referrer: string | null;
}

// eslint-disable-next-line max-lines-per-function
export default function Login({
  referrer = null,
}: LoginPropsType): ReactElement {
  const classes = useStyles();
  const { loginUser } = useActions();
  const user = useSelector((state) => state.user);

  // if someone manually enters the url while logged in, or state changes, redirect
  if (user) {
    const redirect = referrer || '/user';
    return <Redirect to={redirect} />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = getFormData(event);

    // submit the login
    loginUser({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <>
      <Typography variant="h1">Log In</Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField required name="username" label="Username" id="username" />

        <TextField
          required
          name="password"
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
