// mock network calls
import { render, screen } from '@testing-library/react';
import React from 'react';

import Courses from './Courses';

// TODO: mock axios action when actions have been saga-ified

// eslint-disable-next-line max-lines-per-function
describe.skip('TODO: mock axios actions', () => {
  test('renders two courses from mock axios response', async () => {
    render(<Courses />);

    // wait until data has loaded by searching for link with image alt text
    const courses = await screen.findAllByRole('link', { name: /Course Image/ });

    // mocked data has two courses
    expect(courses).toHaveLength(2);
  });

  test('Loading spinner appears at first and disappears after data loads', async () => {
  // I don't love that the two assertions are in the same test, but it's hard to
  // separate them without getting the "act" warning for the "showing loading spinner" test.
    render(<Courses />);

    // spinner should be visible at first
    // the backdrop has attribute "aria-hidden" whether or not it's showing
    const spinner = screen.queryByRole('progressbar', { hidden: true });
    expect(spinner).toBeVisible();

    // wait until data is loaded
    await screen.findAllByRole('link');

    // spinner should be hidden
    // the backdrop has attribute "aria-hidden" whether or not it's showing
    const hiddenSpinner = screen.queryByRole('progressbar', { hidden: true });
    expect(hiddenSpinner).not.toBeVisible();
  });

  test('load error on error response from server', async () => {
  // update mock response from server to be an error
    // TODO: real mock here!!
    // getCoursesFromServer
    //   .mockResolvedValue({ courses: [], error: 'ahooooga!' });

    render(<Courses />);

    // wait until error registers
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});
