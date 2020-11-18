// mock network calls
import React from 'react';
import { render, screen } from '@testing-library/react';
import Courses from './Courses';

jest.mock('../axiosActions');
const mockAxiosActions = require('../axiosActions');

test('renders two courses from mock axios response', async () => {
  render(<Courses />);

  // wait until data is loaded
  // accordions have role "button"
  const courses = await screen.findAllByRole('button');

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
  await screen.findAllByRole('button');

  // spinner should be hidden
  // the backdrop has attribute "aria-hidden" whether or not it's showing
  const hiddenSpinner = screen.queryByRole('progressbar', { hidden: true });
  expect(hiddenSpinner).not.toBeVisible();
});

test.only('load error on error response from server', async () => {
  // update mock response from server to be an error
  mockAxiosActions.getCoursesFromServer
    .mockResolvedValue({ courses: [], error: 'ahooooga!' });

  render(<Courses />);

  // wait until error registers
  const alert = await screen.findByRole('alert');
  expect(alert).toBeInTheDocument();
});
