/* eslint-disable max-lines-per-function */
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

  // restore server handlers
});

test('All forms render for multiple quotes', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const allFormsScreen = renderWithProvider(<ReviewQuotes />, initialState);

  // wait until quote forms appear
  const quoteForms = await allFormsScreen.findAllByRole('form', { name: /review quote \d+/i });
  expect(quoteForms.length).toBe(5);
});

describe('new quotes', () => {
  const initialState = { user: { id: 1, username: 'sheila' } };
  test('add button appears when there are no new quotes', () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<ReviewQuotes />, initialState);

    // find the 'add' button
    const addButton = addButtonScreen.getByRole('button', { name: /add review quote/i });
    expect(addButton).toBeInTheDocument();
  });
  test('flow to add and delete new quote', async () => {
    // render with pre-defined state for user
    const addButtonScreen = renderWithProvider(<ReviewQuotes />, initialState);

    // wait until quote forms appear
    const quoteForms = await addButtonScreen.findAllByRole('form', { name: /review quote \d+/i });
    expect(quoteForms.length).toBe(5);

    // find and click add button
    const addButton = addButtonScreen.getByRole('button', { name: /add review quote/i });
    fireEvent.click(addButton);

    // check that new quote appeared
    const quoteFormsPlusOne = await addButtonScreen.findAllByRole('form', { name: /review quote \d/i });
    expect(quoteFormsPlusOne.length).toBe(6);

    // 'add' button should have disappeared
    const notAddButton = addButtonScreen.queryByRole('button', { name: /add review quote/i });
    expect(notAddButton).not.toBeInTheDocument();

    // delete quote (new quote should have last index, indexing starts at 0)
    const deleteNewQuoteButton = addButtonScreen.getByRole('button', { name: /delete review quote 5/i });
    fireEvent.click(deleteNewQuoteButton);

    // click delete confirmation
    const confirmButton = addButtonScreen.getByRole('button', { name: 'Confirm' });
    fireEvent.click(confirmButton);

    // check that add button re-appears
    const reappearedAddButton = await addButtonScreen.findByRole('button', { name: /add review quote/i });
    expect(reappearedAddButton).toBeInTheDocument();

    // check that quote no longer appears
    const quoteFormsMinusOne = addButtonScreen.getAllByRole('form', { name: /review quote \d/i });
    expect(quoteFormsMinusOne.length).toBe(5);
  });
});

// NOTE: all interactions that require sending data to server are tested in EditReviewQuote.test.jsx
