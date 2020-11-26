import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import { actionTypes } from '../../redux/actions';

export default function Login(): ReactElement {
  // log the user out
  useDispatch({ type: actionTypes.SET_USER });
  return (<Typography>You have been logged out!</Typography>);
}
