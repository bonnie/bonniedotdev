import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    opacity: 0.8,
    position: 'absolute',
    right: '10px',
  },
}));

export default function LogoutIconButton(): ReactElement | null {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  if (user === null) return null;

  const handleLogout = () => {
    history.push('/logout');
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
