/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

// adapted from https://reactrouter.com/web/example/auth-workflow
export default function PrivateRoute({ component, ...rest }): ReactElement {
  const user = useSelector((state) => state.user);

  const routeRender = user
    ? () => component
    : ({ location }) => <Redirect to="/login" referrer={location} />;

  return <Route {...rest} render={routeRender} />;
}
