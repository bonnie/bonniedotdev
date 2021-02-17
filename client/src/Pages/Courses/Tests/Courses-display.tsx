/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

test('Renders four courses for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testCoursesData (see above) for /api/courses

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the Courses retrieval
  const coursesNavLink = screen.getByRole('tab', { name: /Courses/ });
  fireEvent.click(coursesNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await screen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // check titles (all fake names start with "Course")
  const titles = await screen.findAllByText(/Course \d/);
  expect(titles.length).toBe(2);

  // confirm loading spinner has disappeared
  const notLoadingSpinner = screen.queryByRole('progressbar');
  expect(notLoadingSpinner).toBe(null);

  // confirm no error
  const errorAlert = screen.queryByRole('alert');
  expect(errorAlert).not.toBeInTheDocument();
});

test('Renders error alert for error server response', async () => {
  // override default msw response for Courses endpoint with error response
  server.resetHandlers(
    rest.get(urls.coursesURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );

  // render entire App so that we can check Loading and Error
  const errorScreen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the Courses retrieval
  const coursesNavLink = errorScreen.getByRole('tab', { name: /Courses/ });
  fireEvent.click(coursesNavLink);
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
  expect(loadingSpinner).not.toBeVisible();
});
