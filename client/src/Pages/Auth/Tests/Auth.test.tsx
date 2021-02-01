/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import { fireEvent, waitFor } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithRouterAndProvider, renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

test('error-free login / logout flow', async () => {
  // mimic logging in
  const normalScreen = await renderWithRouterProviderAndUser(<App />);

  // confirm redirect to page welcoming user
  const welcomeHeader = await normalScreen.findByRole('heading', { name: /welcome/i });
  expect(welcomeHeader).toBeInTheDocument();

  // confirm localstorage has been set
  // TODO: this suddenly stopped working. Has to do with localstorage sharing?
  // Perhaps localStorage tests are best done via e2e tests...
  // await waitFor(() => expect(localStorage.__STORE__.bonniedotdev_user).toBe('{"id":1,"username":"admin"}'));

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

test.skip('mount when localstorage has login info already', async () => {
  // TODO: why does this pass when it's run with '.only' but fail when it's run
  // with other tests? Is it because they're sharing localstorage?

  // populate localStorage with user info
  localStorage.__STORE__.bonniedotdev_user = '{"id":1,"username":"loggedinUser"}';

  // render login page
  const userScreen = renderWithRouterAndProvider(<App />, { initialRouterEntries: ['/login'] });

  // should show welcome message for logged-in user
  const welcomeHeader = await userScreen.findByRole('heading', { name: /welcome loggedinUser/i });
  expect(welcomeHeader).toBeInTheDocument();
});

test.skip('incorrect login info flow', async () => {
  // TODO: this passes when run as .only, but fails when run with other tests
  // debug data shows logged-in user. I belive it's sharing localstorage.
  // https://github.com/jsdom/jsdom/issues/1137#issuecomment-645490699

  // override default msw response for login endpoint with error response
  server.resetHandlers(
    rest.post(urls.loginURL,
      (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Incorrect login' }))),
  );

  // mimic logging in
  const loginErrorScreen = await renderWithRouterProviderAndUser(<App />);

  // wait until alert appears
  const incorrectLoginAlert = await loginErrorScreen.findByRole('alert');
  expect(incorrectLoginAlert.textContent).toBe('Incorrect login');

  // confirm the user remains on login page
  const logOutHeader = await loginErrorScreen.findByRole('heading', { name: /Log in/i });
  expect(logOutHeader).toBeInTheDocument();

  // confirm logout button does not appear
  const logoutButton = loginErrorScreen.queryByTitle('Log out');
  expect(logoutButton).not.toBeInTheDocument();
});

test('Server error login flow', async () => {
  // override default msw response for login endpoint with error response
  server.resetHandlers(
    rest.post(urls.loginURL,
      (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
  );

  // mimic logging in
  const loginErrorScreen = await renderWithRouterProviderAndUser(<App />);

  // wait until alert appears
  const incorrectLoginAlert = await loginErrorScreen.findByRole('alert');
  expect(incorrectLoginAlert.textContent).toBe('There was a problem connecting to the server');

  // confirm the user remains on login page
  const logOutHeader = await loginErrorScreen.findByRole('heading', { name: /Log in/i });
  expect(logOutHeader).toBeInTheDocument();

  // confirm logout button does not appear
  const logoutButton = loginErrorScreen.queryByTitle('Log out');
  expect(logoutButton).not.toBeInTheDocument();
});
