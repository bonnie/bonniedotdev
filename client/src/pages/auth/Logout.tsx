import { setAlert } from 'Pages/App/Alert/Redux/actions';
import { AlertTypeOptions } from 'Pages/App/Alert/Types';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { clearUser } from './Redux/actions';

export default function Login(): ReactElement {
  const dispatch = useDispatch();
  // log the user out
  dispatch(clearUser());

  // set a success message
  dispatch(setAlert('You have been logged out!', AlertTypeOptions.success));

  return <Redirect to="/login" />;
}
