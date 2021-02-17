import { fireEvent, waitFor } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import {
  renderWithProvider,
  renderWithRouterProviderAndUser,
} from 'TestUtils/renderWith';

test('On server success, renders spinner, then talks, then spinner disappears', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testReviewQuotesData for /api/talks

  // render entire App so that we can check Loading and Error
  const loadingScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review talks retrieval
  const aboutLink = loadingScreen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await loadingScreen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // confirm alert
  const errorAlert = await loadingScreen.findByRole('alert');
  expect(errorAlert).toHaveTextContent('Log in succeeded');

  // check quotes
  const quotes = await loadingScreen.findAllByText(/body \d/);
  expect(quotes.length).toBe(5);

  // confirm loading spinner disappears -- async because of react-query
  await waitFor(() => expect(loadingSpinner).not.toBeVisible());
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
  await waitFor(() => expect(loadingSpinner).not.toBeVisible());
});

test('Renders add button', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const reviewQuotesScreen = renderWithProvider(<ReviewQuotes />, initialState);

  const addButton = reviewQuotesScreen.getByRole('button', {
    name: /add review quote/i,
  });
  expect(addButton).toBeInTheDocument();
});

test('Renders edit and delete buttons', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const reviewQuotesScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // there should be four talks, so four edit buttons and four delete buttons
  const editButtons = await reviewQuotesScreen.findAllByRole('button', {
    name: /edit review quote/i,
  });
  expect(editButtons).toHaveLength(5);

  const deleteButtons = await reviewQuotesScreen.findAllByRole('button', {
    name: /delete review quote/i,
  });
  expect(deleteButtons).toHaveLength(5);
});
