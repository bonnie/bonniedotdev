import { render, screen } from '@testing-library/react';
import moxios from 'moxios';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../redux/configureStore';
import About from './About';

test('renders bio', () => {
  render(
    <Provider store={store}>
      <About />
    </Provider>,
  );
  const bioTitle = screen.getByRole('heading', { name: 'About Bonnie' });
  expect(bioTitle).toBeInTheDocument();
});

const testReviewQuotesData = [
  {
    courseName: 'Course 1',
    courseLink: 'http://test1.org',
    id: 1,
    body: 'body 1',
  },
  {
    courseName: 'Course 2',
    courseLink: 'http://test2.org',
    id: 2,
    body: 'body 2',
  },
  {
    courseName: 'Course 3',
    courseLink: 'http://test3.org',
    id: 3,
    body: 'body 3',
  },
  {
    courseName: 'Course 4',
    courseLink: 'http://test4.org',
    id: 4,
    body: 'body 4',
  },
  {
    courseName: 'Course 5',
    courseLink: 'http://test5.org',
    id: 5,
    body: 'body 5',
  },
];

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('Renders five review quotes for non-error server response', () => {
    render(
      <Provider store={store}>
        <About />
      </Provider>,
    );

    // check for loading while retrieving data from server
    const loading = screen.getByRole('progress');
    expect(loading).toBeVisible();
  });
});
