import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearUser, setAlert } from '../../redux/actions';
import { AlertTypeOptions } from '../../types';

export default function Login(): ReactElement {
  const dispatch = useDispatch();
  // log the user out
  dispatch(clearUser());

  // set a success message
  dispatch(setAlert('You have been logged out!', AlertTypeOptions.success));

  return <Redirect to="/login" />;
}
