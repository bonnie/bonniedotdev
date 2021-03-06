import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

test('error-free login / logout flow', async () => {
  // mimic logging in
  const normalScreen = await renderWithRouterProviderAndUser(<App />);

  // confirm redirect to page welcoming user
  const logOutHeader = await normalScreen.findByRole('heading', {
    name: /welcome/i,
  });
  expect(logOutHeader).toBeInTheDocument();

  // find and click the logout button
  // can't find by role, since title text isn't accessible to refine findByRole query
  const logoutButton = normalScreen.getByTitle('Log out');
  fireEvent.click(logoutButton);

  // Expect to be redirected to login page
  const loginHeader = await normalScreen.findByRole('heading', {
    name: /Log in/i,
  });
  expect(loginHeader).toBeInTheDocument();
});

test('incorrect login info flow', async () => {
  // override default msw response for login endpoint with error response
  server.resetHandlers(
    rest.post(urls.loginURL, (req, res, ctx) =>
      res(ctx.status(400), ctx.json({ message: 'Incorrect login' })),
    ),
  );

  // mimic logging in
  const loginErrorScreen = await renderWithRouterProviderAndUser(<App />);

  // wait until alert appears
  const incorrectLoginAlert = await loginErrorScreen.findByRole('alert');
  expect(incorrectLoginAlert.textContent).toBe('Incorrect login');

  // confirm the user remains on login page
  const logOutHeader = await loginErrorScreen.findByRole('heading', {
    name: /Log in/i,
  });
  expect(logOutHeader).toBeInTheDocument();

  // confirm logout button does not appear
  const logoutButton = loginErrorScreen.queryByTitle('Log out');
  expect(logoutButton).not.toBeInTheDocument();
});

test('Server error login flow', async () => {
  // override default msw response for login endpoint with error response
  server.resetHandlers(
    rest.post(urls.loginURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );

  // mimic logging in
  const loginErrorScreen = await renderWithRouterProviderAndUser(<App />);

  // wait until alert appears
  const incorrectLoginAlert = await loginErrorScreen.findByRole('alert');
  expect(incorrectLoginAlert.textContent).toBe(
    'There was a problem connecting to the server',
  );

  // confirm the user remains on login page
  const logOutHeader = await loginErrorScreen.findByRole('heading', {
    name: /Log in/i,
  });
  expect(logOutHeader).toBeInTheDocument();

  // confirm logout button does not appear
  const logoutButton = loginErrorScreen.queryByTitle('Log out');
  expect(logoutButton).not.toBeInTheDocument();
});
