/* eslint-disable max-lines-per-function */
import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import urls from '../../constants/urls';
import store from '../../redux/configureStore';
import App from '../_app/App';

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

describe('tests with mocked server response', () => {
  test('Renders five review quotes for non-error server response', async () => {
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
    // END: setup /////////////////////////////////////////

    // check loading spinner
    // note: the loading spinner has aria-hidden true whether or not it's visible >_<
    const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
    expect(loadingSpinner).toBeVisible();

    // check quotes
    const quotes = await screen.findAllByText(/body \d/);
    expect(quotes.length).toBe(5);

    // check course links
    const courseLinks = screen.getAllByRole('link', { name: /Course \d/ });
    expect(courseLinks.length).toBe(5);
    courseLinks.forEach((course) => expect(course).toHaveAttribute('href'));

    // confirm loading spinner has disappeared
    const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
    expect(notLoadingSpinner).toBe(null);

    // confirm no error
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();
  });
});

// TODO: how to simulate error response from the server?
test.todo('Renders error alert for error server response');

// , async () => {
//   // close server listening with "good" response
//   server.close();

//   // set up error response
//   const errorServer = setupServer(
//     rest.get(urls.reviewQuotesURL,
//       (req, res, ctx) => res(ctx.status(500), ctx.json({ message: 'oops' }))),
//   );
//   errorServer.listen();

//   // render entire App so that we can check Loading and Error
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//   );

//   // click the 'about' tab to trigger the review quotes retrieval
//   const aboutNavLink = screen.getByRole('tab', { name: /about/ });
//   fireEvent.click(aboutNavLink);
//   // END: setup ///////////////////////////////////////

//   // check loading spinner
//   // note: the loading spinner has aria-hidden true whether or not it's visible >_<
//   const loadingSpinner = await screen.findByRole('progressbar', { hidden: true });
//   expect(loadingSpinner).toBeVisible();

//   // confirm error
//   const errorAlert = screen.getByRole('alert');
//   expect(errorAlert).toBeInTheDocument();

//   // confirm loading spinner has disappeared
//   const notLoadingSpinner = screen.queryByRole('progressbar', { hidden: true });
//   expect(notLoadingSpinner).toBe(null);

//   errorServer.close();
// });
