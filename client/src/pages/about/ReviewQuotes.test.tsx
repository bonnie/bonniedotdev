/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import urls from '../../constants/urls';
import server from '../../mocks/server';
import store from '../../redux/configureStore';
import App from '../_app/App';

// TODO: update to use renderWithRouterAndProvider
test('Renders five review quotes for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return testReviewQuotesData
  // for /api/review_quotes

  // render entire App so that we can check Loading and Error
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );

  // click the 'about' tab to trigger the review quotes retrieval
  const aboutNavLink = screen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  // note: the loading spinner has aria-hidden true whether or not it's visible >_<
  const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
  expect(loadingSpinner).toBeVisible();

  // check quotes
  const quotes = await screen.findAllByText(/body \d/);
  expect(quotes.length).toBe(5);

  // check course links
  const courseLinks = screen.getAllByRole('link', { name: /Course \d/ });
  expect(courseLinks.length).toBe(5);
  courseLinks.forEach((course) => expect(course).toHaveAttribute('href'));

  // confirm loading spinner has disappeared
  const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
  expect(notLoadingSpinner).toBe(null);

  // confirm no error
  const errorAlert = screen.queryByRole('alert');
  expect(errorAlert).not.toBeInTheDocument();
});

test('Renders error alert for error server response', async () => {
  // override default msw response for review_quotes endpoint with error response
  server.resetHandlers(
    rest.get(urls.reviewQuotesURL,
      (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
  );

  // render entire App so that we can check Loading and Error
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );

  // click the 'about' tab to trigger the review quotes retrieval
  const aboutNavLink = screen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutNavLink);
  // END: setup ///////////////////////////////////////

  // check loading spinner
  // note: the loading spinner has aria-hidden true whether or not it's visible >_<
  const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
  expect(loadingSpinner).toBeVisible();

  // confirm error
  const errorAlert = await screen.findByRole('alert');
  expect(errorAlert).toBeInTheDocument();

  // confirm loading spinner has disappeared
  const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
  expect(notLoadingSpinner).toBe(null);
});
