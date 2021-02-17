import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useActions from 'Hooks/useActions';
import useSelector from 'Hooks/useTypedSelector';
import React, { ReactElement } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    opacity: 0.8,
    position: 'absolute',
    right: '10px',
  },
}));

export default function LogoutIconButton(): ReactElement | null {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { logoutUser } = useActions();

  if (user === null) return null;

  return (
    <Box className={classes.root}>
      <IconButton
        edge="end"
        aria-label="log out current user"
        title="Log out"
        aria-haspopup="true"
        onClick={logoutUser}
        color="secondary"
      >
        <ExitToAppIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}
