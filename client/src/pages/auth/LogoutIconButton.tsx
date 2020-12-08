import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import sagaActionIds from 'Redux/Sagas/actionIds';

const useStyles = makeStyles(() => ({
  root: {
    opacity: 0.8,
    position: 'absolute',
    right: '10px',
  },
}));

export default function LogoutIconButton(): ReactElement | null {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  if (user === null) return null;

  const handleLogout = () => {
    // TODO: make this cleaner with action creator function?
    dispatch({ type: sagaActionIds.LOGOUT_USER });
    history.push('/login');
  };

  return (
    <Box className={classes.root}>
      {/* <Typography className={bonnieClass} style={{ fontWeight: 600 }} component="span">
        {user.username}
      </Typography> */}
      <IconButton
        edge="end"
        aria-label="log out current user"
        title="Log out"
        aria-haspopup="true"
        onClick={handleLogout}
        color="secondary"
      >
        <ExitToAppIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
