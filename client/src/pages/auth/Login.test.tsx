/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import urls from '../../Constants/urls';
import server from '../../TestUtils/Mocks/server';
import { renderWithRouterAndProvider } from '../../TestUtils/renderWith';
import App from '../App/App';

const setup = async ({ initialRouterEntries, initialState = {} }) => {
  const screen = renderWithRouterAndProvider(<App />, { initialRouterEntries, initialState });

  // enter username and password
  // actual values not relevant for tests, since server response is mocked
  const userField = await screen.findByLabelText(/username/i);
  fireEvent.change(userField, 'my_username');

  const passwordField = screen.getByLabelText(/password/i);
  fireEvent.change(passwordField, 'my_password');

  // submit the form
  const submitButton = screen.getByRole('button', { name: /log in/i });
  fireEvent.click(submitButton);

  return screen;
};

test.only('error-free login / logout flow', async () => {
  // mimic logging in
  const screen = await setup({ initialRouterEntries: ['/login'] });

  // confirm redirect to page welcoming user
  const logOutHeader = await screen.findByRole('heading', { name: /welcome/i });
  expect(logOutHeader).toBeInTheDocument();

  // find and click the logout button
  // can't find by role, since title text isn't accessible to refine findByRole query
  const logoutButton = screen.getByTitle('Log out');
  fireEvent.click(logoutButton);

  // // Expect to be redirected to login page
  const loginHeader = await screen.findByRole('heading', { name: 'Log in' });
  expect(loginHeader).toBeInTheDocument();
});

test('error login flow', async () => {
  // override default msw response for login endpoint with error response
  server.resetHandlers(
    rest.post(urls.loginURL,
      (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'incorrect login' }))),
  );

  // mimic logging in
  const screen = await setup({ initialRouterEntries: ['/login'] });

  // wait until alert appears
  const incorrectLoginAlert = await screen.findByRole('alert');
  expect(incorrectLoginAlert).toBeInTheDocument();

  // confirm the user remains on login page
  const logOutHeader = await screen.findByRole('heading', { name: /Log in/i });
  expect(logOutHeader).toBeInTheDocument();

  // confirm logout button does not appear
  const logoutButton = screen.queryByTitle('Log out');
  expect(logoutButton).not.toBeInTheDocument();
});
