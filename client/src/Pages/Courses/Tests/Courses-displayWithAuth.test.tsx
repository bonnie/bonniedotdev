import { fireEvent } from '@testing-library/react';
import App from 'Pages/App/App';
import Courses from 'Pages/Courses/Courses';
import React from 'react';
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

  // confirm courses appear
  // check names (all fake names start with "Course")
  const titles = await loadingScreen.findAllByText(/Course \d/);
  expect(titles).toHaveLength(2);
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
