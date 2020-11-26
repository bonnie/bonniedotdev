import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import Login from './Login';
import Logout from './Logout';

export default function Auth(): ReactElement {
  const user = useSelector((state) => state.user);
  return (
    <div />
  );
}
