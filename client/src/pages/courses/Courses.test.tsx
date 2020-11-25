/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../redux/configureStore';
import App from '../_app/App';

// eslint-disable-next-line max-lines-per-function
describe('tests with mocked server response', () => {
  test('Renders five review quotes for non-error server response', async () => {
    // Note: mocked server response is handled by msw, in the src/mocks folder
    // and src/setupTests.js. The handler is set to return testCoursesJSONResponse
    // for /api/courses

    // render entire App so that we can check Loading and Error
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // click the 'courses' tab to trigger the courses retrieval
    const coursesNavLink = screen.getByRole('tab', { name: /courses/ });
    fireEvent.click(coursesNavLink);
    // END: setup /////////////////////////////////////////

    // check loading spinner
    // note: the loading spinner has aria-hidden true whether or not it's visible >_<
    const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
    expect(loadingSpinner).toBeVisible();

    // check courses by looking for link on image
    // actual course details checked in Course.test.tsx
    const courses = await screen.findAllByRole('link', { name: /Course Image/ });
    expect(courses.length).toBe(2);

    // confirm loading spinner has disappeared
    const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
    expect(notLoadingSpinner).toBe(null);

    // confirm no error
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();
  });
});

test.todo('load error on error response from server');

//   async () => {
//   // update mock response from server to be an error
//     // TODO: real mock here!!
//     // getCoursesFromServer
//     //   .mockResolvedValue({ courses: [], error: 'ahooooga!' });

//     render(<Courses />);

//     // wait until error registers
//     const alert = await screen.findByRole('alert');
//     expect(alert).toBeInTheDocument();
//   });
// });
