/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import store from '../../redux/configureStore';
import storeFactory from '../../testUtils/storeFactory';
import App from '../app/App';
import ReviewQuotes from './ReviewQuotes';

// eslint-disable-next-line import/prefer-default-export
export const testReviewQuotesData = [
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

describe('Set up ReviewQuotes with fake data in store', () => {
  beforeEach(() => {
    // QUESTION: this works. But is it testing implementation...?
    // seems so, by supplying the state :-/
    const storeWithState = storeFactory({ reviewQuotes: testReviewQuotesData });
    render(
      <Provider store={storeWithState}>
        <ReviewQuotes />
      </Provider>,
    );
  });

  test('displays quotes', () => {
    const quotes = screen.getAllByText(/body \d/);
    expect(quotes.length).toBe(5);
  });
  test('displays links to courses', () => {
    const courseLinks = screen.getAllByRole('link', { name: /Course \d/ });
    expect(courseLinks.length).toBe(5);
    courseLinks.forEach((course) => expect(course).toHaveAttribute('href'));
  });
});

describe.skip('tests with mocked server response', () => {
  // TODO: How to get redux saga to watch during tests??
  beforeEach(() => {
    // Note: mocked server response is handled by msw, in the src/mocks folder
    // and src/setupTests.js. The handler is set to return testReviewQuotesData
    // for /api/review_quotes

    // render entire App so that we can check Loading and Error
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    // click the 'about' tab to trigger the review quotes retrieval
    const aboutNavLink = screen.getByRole('tab', { name: /about/ });
    fireEvent.click(aboutNavLink);
  });
  test('Renders five review quotes for non-error server response', async () => {
    // wait until the quotes show up
    // spoiler alert: they don't :/
    const quotes = await screen.findAllByText(/body \d/);
    expect(quotes.length).toBe(5);
  });
});
