import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import Talks from 'Pages/Talks/Talks';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import {
  renderWithProvider,
  renderWithRouterProviderAndUser,
} from 'TestUtils/renderWith';

test('On server success, renders spinner, then talks, then spinner disappears', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testTalksData (see above) for /api/talks

  // render entire App so that we can check Loading and Error
  const loadingScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review talks retrieval
  const talkNavLink = loadingScreen.getByRole('tab', { name: /talk/ });
  fireEvent.click(talkNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await loadingScreen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // check titles (all fake titles start with "i am")
  const titles = await loadingScreen.findAllByRole('heading', {
    name: /i am/i,
  });
  expect(titles.length).toBe(4);

  // confirm alert
  const errorAlert = await loadingScreen.findByRole('alert');
  expect(errorAlert).toHaveTextContent('Log in succeeded');

  // confirm loading spinner disappears
  const notLoadingSpinner = loadingScreen.queryByRole('progressbar');
  expect(notLoadingSpinner).not.toBeInTheDocument();
});

test('Renders error alert for error server response', async () => {
  // TODO: why does this cause "Error: Error: connect ECONNREFUSED 127.0.0.1:80" when
  // run in parallel with the other tests, even though all tests pass?
  // Commenting this '.skip' or '.only' makes the warning go away T.T
  // AND: why does this error not appear with the notLoggedIn test file??
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // END: todo

  server.resetHandlers(
    rest.get(urls.talksURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );
  // render entire App so that we can check Loading and Error
  const errorScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review talks retrieval
  const aboutNavLink = errorScreen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutNavLink);
  // END: setup ///////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await errorScreen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // confirm alert
  const errorAlert = await errorScreen.findByRole('alert');
  expect(errorAlert).toHaveTextContent(
    'There was a problem connecting to the server',
  );

  // confirm loading spinner disappears
  const notLoadingSpinner = errorScreen.queryByRole('progressbar');
  expect(notLoadingSpinner).not.toBeInTheDocument();
});

test('Renders add button', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const talksScreen = renderWithProvider(<Talks />, initialState);

  const addButton = talksScreen.getByRole('button', { name: /add talk/i });
  expect(addButton).toBeInTheDocument();
});

test('Renders edit and delete buttons', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const talksScreen = renderWithProvider(<Talks />, initialState);

  // there should be four talks, so four edit buttons and four delete buttons
  const editButtons = await talksScreen.findAllByRole('button', {
    name: /edit talk/i,
  });
  expect(editButtons).toHaveLength(4);

  const deleteButtons = await talksScreen.findAllByRole('button', {
    name: /delete talk/i,
  });
  expect(deleteButtons).toHaveLength(4);
});
