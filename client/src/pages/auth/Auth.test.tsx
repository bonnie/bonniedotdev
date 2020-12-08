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

test('error-free login / logout flow', async () => {
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
  const loginHeader = await screen.findByRole('heading', { name: /Log in/i });
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

// Warning: Cannot update a component (`AlertBox`) while rendering a different component (`Login`). To locate the bad setState() call inside `Login`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
//         at Login (/Users/bonnieschulkin/src/bonniedotdev/client/src/Pages/Auth/Logout.tsx:10:20)
//         at Route (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/react-router/cjs/react-router.js:470:29)
//         at Switch (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/react-router/cjs/react-router.js:676:29)
//         at div
//         at Container (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/@material-ui/core/Container/Container.js:92:23)
//         at WithStyles(ForwardRef(Container)) (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/@material-ui/styles/withStyles/withStyles.js:67:31)
//         at App
//         at div
//         at Styled(MuiBox) (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/@material-ui/styles/styled/styled.js:95:28)
//         at ThemeProvider (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/@material-ui/styles/ThemeProvider/ThemeProvider.js:48:24)
//         at App (/Users/bonnieschulkin/src/bonniedotdev/client/src/Pages/App/App.tsx:14:19)
//         at Router (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/react-router/cjs/react-router.js:99:30)
//         at MemoryRouter (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/react-router/cjs/react-router.js:187:35)
//         at Provider (/Users/bonnieschulkin/src/bonniedotdev/client/node_modules/react-redux/lib/components/Provider.js:19:20)

//       at printWarning (node_modules/react-dom/cjs/react-dom.development.js:67:30)
//       at error (node_modules/react-dom/cjs/react-dom.development.js:43:5)
//       at warnAboutRenderPhaseUpdatesInDEV (node_modules/react-dom/cjs/react-dom.development.js:24002:15)
//       at scheduleUpdateOnFiber (node_modules/react-dom/cjs/react-dom.development.js:21836:3)
//       at dispatchAction (node_modules/react-dom/cjs/react-dom.development.js:16139:5)
//       at Subscription.checkForUpdates [as onStateChange] (node_modules/react-redux/lib/hooks/useSelector.js:77:7)
//       at Subscription.handleChangeWrapper (node_modules/react-redux/lib/utils/Subscription.js:101:12)
//
// Questions:
// 1. Why does this only happen with Login, when everyone else alters AlertBox too?
// 2. Why is it complaining about Login, when it's the Logout component making trouble?
