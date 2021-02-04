import { fireEvent } from '@testing-library/react';
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
  const notLoadingSpinner = loadingScreen.queryByRole('progressbar');
  expect(notLoadingSpinner).not.toBeInTheDocument();
});

test('Renders error alert for error server response', async () => {
  // TODO: why does this cause "Error: Error: connect ECONNREFUSED 127.0.0.1:80" when
  // run in parallel with the other tests, even though all tests pass?
  // Commenting this '.skip' or '.only' makes the warning go away T.T
  // AND: why does this error not appear with the notLoggedIn test file??
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  jest.spyOn(console, 'error').mockImplementation(() => {});
  // END: todo

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
  const notLoadingSpinner = errorScreen.queryByRole('progressbar');
  expect(notLoadingSpinner).not.toBeInTheDocument();
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

/* eslint-disable max-lines-per-function */
// import { fireEvent } from '@testing-library/react';
// import urls from 'Constants/urls';
// import { rest } from 'msw';
// import App from 'Pages/App/App';
// import React from 'react';
// import server from 'TestUtils/Mocks/server';
// import { renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

// test('Renders two courses for non-error server response', async () => {
//   // Note: mocked server response is handled by msw, in the src/mocks folder
//   // and src/setupTests.js. The handler is set to return testCoursesJSONResponse
//   // for /api/courses

//   // render entire App so that we can check Loading and Error
//   const screen = await renderWithRouterProviderAndUser(<App />);

//   // click the 'courses' tab to trigger the courses retrieval
//   const coursesNavLink = screen.getByRole('tab', { name: /courses/ });
//   fireEvent.click(coursesNavLink);
//   // END: setup /////////////////////////////////////////

//   // check loading spinner
//   // note: the loading spinner has aria-hidden true whether or not it's visible >_<
//   const loadingSpinner = await screen.findByRole('progressbar', {
//     hidden: true,
//   });
//   expect(loadingSpinner).toBeVisible();

//   // check courses by looking for field to enter/edit course name
//   // actual course details checked in EditCourse.test.tsx
//   const courses = await screen.findAllByText(/Course \d/);
//   expect(courses).toHaveLength(2);

//   // confirm loading spinner has disappeared
//   const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
//   expect(notLoadingSpinner).toBe(null);

//   // confirm no error (there will be a "log in successful" alert, but it won't have error class)
//   const errorAlert = screen.queryByRole('alert');
//   expect(errorAlert).not.toHaveClass('MuiAlert-standardError');
// });

// test('Renders error alert for error server response', async () => {
//   // TODO: why does this cause "Error: Error: connect ECONNREFUSED 127.0.0.1:80" when
//   // run in parallel with the other tests, even though all tests pass?
//   // Commenting this '.skip' or '.only' makes the warning go away T.T
//   // AND: why does this error not appear with the notLoggedIn test file??
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   jest.spyOn(console, 'error').mockImplementation(() => {});
//   // END: todo

//   // override default msw response for review_quotes endpoint with error response
//   server.resetHandlers(
//     rest.get(urls.coursesURL, (req, res, ctx) =>
//       res(ctx.status(500), ctx.json({ message: 'oops' })),
//     ),
//   );

//   // render entire App so that we can check Loading and Error
//   const screen = await renderWithRouterProviderAndUser(<App />);

//   // click the 'courses' tab to trigger the courses retrieval
//   const coursesNavLink = screen.getByRole('tab', { name: /courses/ });
//   fireEvent.click(coursesNavLink);
//   // END: setup ///////////////////////////////////////

//   // check loading spinner
//   // note: the loading spinner has aria-hidden true whether or not it's visible >_<
//   const loadingSpinner = await screen.findByRole('progressbar', {
//     hidden: true,
//   });
//   expect(loadingSpinner).toBeVisible();

//   // confirm error
//   const errorAlert = await screen.findByRole('alert');
//   expect(errorAlert).toHaveClass('MuiAlert-standardError');

//   // confirm loading spinner has disappeared
//   const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
//   expect(notLoadingSpinner).toBe(null);
// });
