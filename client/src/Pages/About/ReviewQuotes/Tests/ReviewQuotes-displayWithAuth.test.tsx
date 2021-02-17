import { fireEvent } from '@testing-library/react';
import ReviewQuotes from 'Pages/About/ReviewQuotes/ReviewQuotes';
import App from 'Pages/App/App';
import React from 'react';
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

  // check quotes
  const quotes = await loadingScreen.findAllByText(/body \d/);
  expect(quotes.length).toBe(5);
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
