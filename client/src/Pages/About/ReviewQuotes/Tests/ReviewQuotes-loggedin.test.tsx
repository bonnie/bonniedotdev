import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithProvider, renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

test('On server success, renders spinner, then quotes, then spinner disappears', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testReviewQuotesData (see above) for /api/review_quotes

  // render entire App so that we can check Loading and Error
  const loadingScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review quotes retrieval
  const aboutNavLink = loadingScreen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await loadingScreen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

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
  // AND: why does it work ok in the notLoggedIn test file??
  server.resetHandlers(
    rest.get(urls.reviewQuotesURL, (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
  );
  // render entire App so that we can check Loading and Error
  const errorScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review quotes retrieval
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

test('All forms render for multiple quotes', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const allFormsScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until quote forms appear
  const quoteForms = await allFormsScreen.findAllByRole('form', { name: /review quote \d+/i });
  expect(quoteForms.length).toBe(5);
});
