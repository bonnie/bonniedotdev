/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import App from 'Pages/App/App';
import React from 'react';
import {
  renderWithRouterAndProvider,
  renderWithRouterProviderAndUser,
} from 'TestUtils/renderWith';

test('Renders four courses for non-error server response when not logged in', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testCoursesData (see above) for /api/courses

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'courses' tab to trigger the Courses retrieval
  const coursesNavLink = screen.getByRole('tab', { name: /courses/i });
  fireEvent.click(coursesNavLink);

  // check titles (all fake names start with "Course")
  const titles = await screen.findAllByText(/Course \d/);
  expect(titles.length).toBe(2);
});

test('Displays courses when logged in', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testCoursesData (see above) for /api/courses

  // render entire App so that we can check Loading and Error
  const loadingScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'courses' tab to trigger the review courses retrieval
  const courseNavLink = loadingScreen.getByRole('tab', { name: /courses/i });
  fireEvent.click(courseNavLink);

  // confirm courses appear
  // check names (all fake names start with "Course")
  const titles = await loadingScreen.findAllByText(/Course \d/);
  expect(titles).toHaveLength(2);
});
