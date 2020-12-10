/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithProvider, renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

// TODO: why tf does this test and 'All forms render for multiple quotes'
// succeed when run independently, but the second one fails when run one
// after the other (doesn't matter which is first, the second will fail).

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

test('All forms render for multiple quotes', async () => {
  // render once before all tests, with pre-defined state
  const initialState = { user: { id: 1, username: 'sheila' } };
  const allFormsScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until quote forms appear
  const quoteForms = await allFormsScreen.findAllByRole('form', { name: /review quote \d+/i });
  expect(quoteForms.length).toBe(5);
});

test.todo('update a quote');
test.todo('delete a quote');

describe.skip('server error response', () => {
  test('Renders error alert for error server response', async () => {
  // override default msw response for review_quotes endpoint with error response
    server.resetHandlers(
      rest.get(urls.reviewQuotesURL,
        (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
    );

    // render entire App so that we can check Loading and Error
    const screen = await renderWithRouterProviderAndUser(<App />);

    // click the 'about' tab to trigger the review quotes retrieval
    const aboutNavLink = screen.getByRole('tab', { name: /about/ });
    fireEvent.click(aboutNavLink);
    // END: setup ///////////////////////////////////////

    // check loading spinner
    // note: the loading spinner has aria-hidden true whether or not it's visible >_<
    const loadingSpinner = await screen.findByRole('progressbar');
    expect(loadingSpinner).toBeVisible();

    // confirm error
    const errorAlert = await screen.findByRole('alert');
    expect(errorAlert).toBeInTheDocument();

    // confirm loading spinner has disappeared
    const notLoadingSpinner = screen.queryByRole('progressbar');
    expect(notLoadingSpinner).toBe(null);
  });
});
