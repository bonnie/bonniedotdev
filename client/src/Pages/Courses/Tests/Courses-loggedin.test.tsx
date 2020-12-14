/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

test('Renders two courses for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return testCoursesJSONResponse
  // for /api/courses

  // render entire App so that we can check Loading and Error
  const screen = await renderWithRouterProviderAndUser(<App />);

  // click the 'courses' tab to trigger the courses retrieval
  const coursesNavLink = screen.getByRole('tab', { name: /courses/ });
  fireEvent.click(coursesNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  // note: the loading spinner has aria-hidden true whether or not it's visible >_<
  const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
  expect(loadingSpinner).toBeVisible();

  // check courses by looking for field to enter/edit course name
  // actual course details checked in EditCourse.test.tsx
  const course1 = await screen.findByText('React Testing with Jest and Enzyme');
  expect(course1).toBeInTheDocument();

  const course2 = await screen.findByText('Regular Expressions for Beginners and Beyond! With Exercises');
  expect(course2).toBeInTheDocument();

  // confirm loading spinner has disappeared
  const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
  expect(notLoadingSpinner).toBe(null);

  // confirm no error (there will be a "log in successful" alert, but it won't have error class)
  const errorAlert = screen.queryByRole('alert');
  expect(errorAlert).not.toHaveClass('MuiAlert-standardError');
});

test('Renders error alert for error server response', async () => {
  // override default msw response for review_quotes endpoint with error response
  server.resetHandlers(
    rest.get(urls.coursesURL,
      (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
  );

  // render entire App so that we can check Loading and Error
  const screen = await renderWithRouterProviderAndUser(<App />);

  // click the 'courses' tab to trigger the courses retrieval
  const coursesNavLink = screen.getByRole('tab', { name: /courses/ });
  fireEvent.click(coursesNavLink);
  // END: setup ///////////////////////////////////////

  // check loading spinner
  // note: the loading spinner has aria-hidden true whether or not it's visible >_<
  const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
  expect(loadingSpinner).toBeVisible();

  // confirm error
  const errorAlert = await screen.findByRole('alert');
  expect(errorAlert).toHaveClass('MuiAlert-standardError');

  // confirm loading spinner has disappeared
  const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
  expect(notLoadingSpinner).toBe(null);
});
