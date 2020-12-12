/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import urls from '../../../Constants/urls';
import server from '../../../TestUtils/Mocks/server';
import { renderWithRouterProviderAndUser } from '../../../TestUtils/renderWith';
import App from '../../App/App';

test.only('error-free login / logout flow', async () => {
  // mimic logging in
  const normalScreen = await renderWithRouterProviderAndUser(<App />);

  // confirm redirect to page welcoming user
  const welcomeHeader = await normalScreen.findByRole('heading', { name: /welcome/i });
  expect(welcomeHeader).toBeInTheDocument();

  // confirm localstorage has been set
  expect(localStorage.__STORE__.bonniedotdev_user).toBe('{"id":1,"username":"admin"}');

  // confirm redirect to page welcoming user
  const logOutHeader = await normalScreen.findByRole('heading', { name: /welcome/i });
  expect(logOutHeader).toBeInTheDocument();

  // find and click the logout button
  // can't find by role, since title text isn't accessible to refine findByRole query
  const logoutButton = normalScreen.getByTitle('Log out');
  fireEvent.click(logoutButton);

  // // Expect to be redirected to login page
  const loginHeader = await normalScreen.findByRole('heading', { name: /Log in/i });
  expect(loginHeader).toBeInTheDocument();

  // confirm localstorage has been un-set
  expect(localStorage.__STORE__).not.toHaveProperty('bonniedotdev_user');
});

test('server error login flow', async () => {
  // override default msw response for login endpoint with error response
  server.resetHandlers(
    rest.post(urls.loginURL,
      (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'incorrect login' }))),
  );

  // mimic logging in
  const loginErrorScreen = await renderWithRouterProviderAndUser(<App />);

  // wait until alert appears
  const incorrectLoginAlert = await loginErrorScreen.findByRole('alert');
  expect(incorrectLoginAlert).toBeInTheDocument();

  // confirm the user remains on login page
  const logOutHeader = await loginErrorScreen.findByRole('heading', { name: /Log in/i });
  expect(logOutHeader).toBeInTheDocument();

  // confirm logout button does not appear
  const logoutButton = loginErrorScreen.queryByTitle('Log out');
  expect(logoutButton).not.toBeInTheDocument();
});

test.todo('Server error login flow');
