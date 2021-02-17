/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

test('Renders four ReviewQuotes for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testReviewQuotesData (see above) for /api/ReviewQuotes

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the ReviewQuotes retrieval
  const aboutNavLink = screen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await screen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // check quotes
  const quotes = await screen.findAllByText(/body \d/);
  expect(quotes.length).toBe(5);

  // check course links
  const courseLinks = screen.getAllByRole('link', { name: /Course \d/ });
  expect(courseLinks.length).toBe(5);
  courseLinks.forEach((course) => expect(course).toHaveAttribute('href'));

  // confirm loading spinner has disappeared
  expect(loadingSpinner).not.toBeVisible();

  // confirm no error
  const errorAlert = screen.queryByRole('alert');
  expect(errorAlert).not.toBeInTheDocument();
});

test.only('Renders error alert for error server response', async () => {
  // to suppress the console error from axios, since error is handled later by react-query
  jest.spyOn(console, 'error').mockImplementation((error) => {
    if (
      !error.toString().startsWith('Error: Request failed with status code 500')
    ) {
      // eslint-disable-next-line no-console
      console.log('\x1b[31m', error);
    }
  });

  // override default msw response for ReviewQuotes and courses endpoints with error response
  server.resetHandlers(
    rest.get(urls.reviewQuotesURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
    rest.get(urls.coursesURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );

  // render entire App so that we can check Loading and Error
  const errorScreen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the ReviewQuotes retrieval
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
  expect(loadingSpinner).not.toBeVisible();
});
