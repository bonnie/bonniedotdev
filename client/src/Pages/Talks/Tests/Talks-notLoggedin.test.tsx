/* eslint-disable max-lines-per-function */
import { findAllByRole, fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithProvider, renderWithRouterAndProvider } from 'TestUtils/renderWith';

import Talks from '../Talks';

test('Renders five talks for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testTalksData (see above) for /api/talks

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the talks retrieval
  const talksNavLink = screen.getByRole('tab', { name: /talks/ });
  fireEvent.click(talksNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await screen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // check titles (all fake titles start with "i am")
  const titles = await screen.findAllByText(/i am/i);
  expect(titles.length).toBe(4);

  // confirm loading spinner has disappeared
  const notLoadingSpinner = screen.queryByRole('progressbar');
  expect(notLoadingSpinner).toBe(null);

  // confirm no error
  const errorAlert = screen.queryByRole('alert');
  expect(errorAlert).not.toBeInTheDocument();
});

describe.skip('separates upcoming / future and sorts by date', () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testTalksData (see above) for /api/talks

  test('upcoming talks sorted by date', async () => {
    const allTalksScreen = renderWithProvider(<Talks />);

    const upcomingTalks = allTalksScreen.getByRole('rowgroup', { name: 'upcoming' });

    // wait until dates appear
    const dates = await findAllByRole(upcomingTalks, /date \d+/i);

    // check that they're in the expected order
    const dateOrder = dates.map((date) => date.textContent);
    expect(dateOrder).toEqual(['2021-1-25', '2021-01-28']);
  });

  test('past talks sorted by reverse date', async () => {
    const allTalksScreen = renderWithProvider(<Talks />);

    const upcomingTalks = allTalksScreen.getByRole('rowgroup', { name: 'past' });

    // wait until dates appear
    const dates = await findAllByRole(upcomingTalks, /date \d+/i);

    // check that they're in the expected order
    const dateOrder = dates.map((date) => date.textContent);
    expect(dateOrder).toEqual(['2020-1-25', '2020-01-23']);
  });
});

test('Renders error alert for error server response', async () => {
  // override default msw response for talks endpoint with error response
  server.resetHandlers(
    rest.get(urls.talksURL, (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
  );

  // render entire App so that we can check Loading and Error
  const errorScreen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the talks retrieval
  const talksNavLink = errorScreen.getByRole('tab', { name: /talks/ });
  fireEvent.click(talksNavLink);
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
