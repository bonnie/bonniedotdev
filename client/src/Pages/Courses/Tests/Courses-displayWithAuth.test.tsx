import { fireEvent, waitFor } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import Courses from 'Pages/Courses/Courses';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import {
  renderWithProvider,
  renderWithRouterProviderAndUser,
} from 'TestUtils/renderWith';

test('On server success, renders spinner, then courses, then spinner disappears', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testCoursesData (see above) for /api/courses

  // render entire App so that we can check Loading and Error
  const loadingScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'courses' tab to trigger the review courses retrieval
  const courseNavLink = loadingScreen.getByRole('tab', { name: /courses/i });
  fireEvent.click(courseNavLink);
  // END: setup /////////////////////////////////////////

  // check loading spinner
  const loadingSpinner = await loadingScreen.findByRole('progressbar');
  expect(loadingSpinner).toBeVisible();

  // confirm alert
  const errorAlert = await loadingScreen.findByRole('alert');
  expect(errorAlert).toHaveTextContent('Log in succeeded');

  // confirm courses appear
  // check names (all fake names start with "Course")
  const titles = await loadingScreen.findAllByText(/Course \d/);
  expect(titles).toHaveLength(2);

  // confirm loading spinner disappears

  expect(loadingSpinner).not.toBeVisible();
});

test('Renders error alert for error server response', async () => {
  jest.spyOn(console, 'error').mockImplementation((error) => {
    if (
      !error
        .toString()
        .startsWith('Error: Request failed with status code 500') &&
      !error.toString().startsWith('Error: Network Error')
    ) {
      // eslint-disable-next-line no-console
      console.log('\x1b[31m', error);
    }
  });

  server.resetHandlers(
    rest.get(urls.coursesURL, (req, res, ctx) =>
      res(ctx.status(500), ctx.json({ message: 'oops' })),
    ),
  );
  // render entire App so that we can check Loading and Error
  const errorScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review Courses retrieval
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
  // this is async because of react-query useIsFetching
  await waitFor(() => expect(loadingSpinner).not.toBeVisible());
});

test('Renders course add button', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const coursesScreen = renderWithProvider(<Courses />, initialState);

  const addButton = coursesScreen.getByRole('button', { name: /add course/i });
  expect(addButton).toBeInTheDocument();
});

test('Renders course edit and delete buttons', async () => {
  // render with pre-defined state for user
  const initialState = { user: { id: 1, username: 'sheila' } };
  const coursesScreen = renderWithProvider(<Courses />, initialState);

  // there should be four Courses, so four edit buttons and four delete buttons
  const editButtons = await coursesScreen.findAllByRole('button', {
    name: /edit course/i,
  });
  expect(editButtons).toHaveLength(2);

  const deleteButtons = await coursesScreen.findAllByRole('button', {
    name: /delete course/i,
  });
  expect(deleteButtons).toHaveLength(2);
});
