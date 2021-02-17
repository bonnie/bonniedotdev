// testing useDataFromServer hook.
// Using Talks because it's the most "pure" (doesn't get
// need Courses like ReviewQuotes, or have nested data like Courses / Coupons)
//
// This file breaks down loading and errors, to find issues with
// that flow. Test files specific to each type of item will reveal
// issues specific to that item

/* eslint-disable max-lines-per-function */
import { fireEvent, waitFor } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

test('Renders loading and no error for non-error server response', async () => {
  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the talks retrieval
  const talksNavLink = screen.getByRole('tab', { name: /talks/ });
  fireEvent.click(talksNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await screen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // confirm loading spinner disappears
  await waitFor(() => expect(loadingSpinner).not.toBeVisible());

  // confirm no error
  const errorAlert = screen.queryByRole('alert');
  expect(errorAlert).not.toBeInTheDocument();
});

test('Renders error alert for error server response', async () => {
  // to suppress the console error from axios, since error is handled later by react-query
  jest.spyOn(console, 'error').mockImplementation((error) => {
    const e = error.toString();
    if (
      !e.startsWith('Error: Request failed with status code 500') &&
      !e.startsWith('Error: Network Error')
    ) {
      // eslint-disable-next-line no-console
      console.log('\x1b[31m', error);
    }
  });

  // override default msw response for talks endpoint with error response
  server.resetHandlers(
    rest.get(urls.talksURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the talks retrieval
  const talksNavLink = screen.getByRole('tab', { name: /talks/ });
  fireEvent.click(talksNavLink);
  // END: setup ///////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await screen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // confirm alert
  const errorAlert = await screen.findByRole('alert');
  expect(errorAlert).toHaveTextContent(
    'There was a problem connecting to the server',
  );

  // confirm loading spinner disappears
  expect(loadingSpinner).not.toBeVisible();
});

test('Does not render slide link if data is not present', () => {
  server.resetHandlers(
    rest.get(urls.talksURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );
});
