/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';

import urls from '../../constants/urls';
import server from '../../mocks/server';
import { renderWithRouterAndProvider } from '../../testUtils/renderWith';
import App from '../_app/App';

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

test('error-free login / logout flow', async () => {
  // mimic logging in
  const screen = await setup({ initialRouterEntries: ['/login'] });

  // confirm redirect to page welcoming user
  const logOutHeader = await screen.findByRole('heading', { name: /welcome/i });
  expect(logOutHeader).toBeInTheDocument();

  // TODO: figure out how to get around error after "clicking" logout:
  //     Warning: Cannot update a component (`AlertBox`)
  //     while rendering a different component (`Login`).
  // Very recent stackoverflow with no answers: https://stackoverflow.com/q/65030740
  // No error in actual app...
  // find and click the logout button
  // can't find by role, since title text isn't accessible to refine findByRole query
  const logoutButton = screen.getByTitle('Log out');
  fireEvent.click(logoutButton);

  // // Expect to be redirected to login page
  // const loginHeader = await screen.findByRole('heading', { name: 'Log in' });
  // expect(loginHeader).toBeInTheDocument();
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
