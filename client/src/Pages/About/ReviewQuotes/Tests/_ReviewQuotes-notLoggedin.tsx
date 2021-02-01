/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import { renderWithProvider, renderWithRouterAndProvider } from 'TestUtils/renderWith';

test.todo('do a test');

// import ReviewQuotes from '../_old_ReviewQuotes';

// TestUtils/Data/testReviewQuotesData for reference
// Can't simply define it here, or there would be a
// circular reference with TestUtils/Mocks/server
//
// const testReviewQuotesData = [
//   {
//     courseName: 'Course 1',
//     courseLink: 'http://test1.org',
//     id: 1,
//     body: 'body 12345',
//     courseId: 1,
//   },
//   {
//     courseName: 'Course 2',
//     courseLink: 'http://test2.org',
//     id: 2,
//     body: 'body 2345',
//     courseId: 1,
//   },
//   {
//     courseName: 'Course 3',
//     courseLink: 'http://test3.org',
//     id: 3,
//     body: 'body 345',
//     courseId: 1,
//   },
//   {
//     courseName: 'Course 4',
//     courseLink: 'http://test4.org',
//     id: 4,
//     body: 'body 45',
//     courseId: 1,
//   },
//   {
//     courseName: 'Course 5',
//     courseLink: 'http://test5.org',
//     id: 5,
//     body: 'body 5',
//     courseId: 1,
//   },
// ];

// test('Renders five review quotes for non-error server response', async () => {
//   // Note: mocked server response is handled by msw, in the src/mocks folder
//   // and src/setupTests.js. The handler is set to return
//   // TestUtils/Data/testReviewQuotesData (see above) for /api/review_quotes

//   // render entire App so that we can check Loading and Error
//   const screen = renderWithRouterAndProvider(<App />);

//   // click the 'about' tab to trigger the review quotes retrieval
//   const aboutNavLink = screen.getByRole('tab', { name: /about/ });
//   fireEvent.click(aboutNavLink);
//   // END: setup /////////////////////////////////////////

//   // check loading spinner
//   const loadingSpinner = await screen.findByRole('progressbar');
//   expect(loadingSpinner).toBeVisible();

//   // check quotes
//   const quotes = await screen.findAllByText(/body \d/);
//   expect(quotes.length).toBe(5);

//   // check course links
//   const courseLinks = screen.getAllByRole('link', { name: /Course \d/ });
//   expect(courseLinks.length).toBe(5);
//   courseLinks.forEach((course) => expect(course).toHaveAttribute('href'));

//   // confirm loading spinner has disappeared
//   const notLoadingSpinner = screen.queryByRole('progressbar');
//   expect(notLoadingSpinner).toBe(null);

//   // confirm no error
//   const errorAlert = screen.queryByRole('alert');
//   expect(errorAlert).not.toBeInTheDocument();
// });

// test('sorts by quote length', async () => {
//   // Note: mocked server response is handled by msw, in the src/mocks folder
//   // and src/setupTests.js. The handler is set to return
//   // TestUtils/Data/testReviewQuotesData (see above) for /api/review_quotes

//   const allFormsScreen = renderWithProvider(<ReviewQuotes />);

//   // wait until quotes appear
//   const quoteBodies = await allFormsScreen.findAllByText(/body \d+/i);

//   // check that they're in the expected order
//   const bodyTextOrder = quoteBodies.map((body) => body.textContent);
//   expect(bodyTextOrder).toEqual(['body 5', 'body 45', 'body 345', 'body 2345', 'body 12345']);
// });

// test('Renders error alert for error server response', async () => {
//   // override default msw response for review_quotes endpoint with error response
//   server.resetHandlers(
//     rest.get(urls.reviewQuotesURL, (req, res, ctx) =>
// res(ctx.status(500), ctx.json({ message: 'oops' }))),
//   );

//   // render entire App so that we can check Loading and Error
//   const errorScreen = renderWithRouterAndProvider(<App />);

//   // click the 'about' tab to trigger the review quotes retrieval
//   const aboutNavLink = errorScreen.getByRole('tab', { name: /about/ });
//   fireEvent.click(aboutNavLink);
//   // END: setup ///////////////////////////////////////

//   // check loading spinner
//   const loadingSpinner = await errorScreen.findByRole('progressbar');
//   expect(loadingSpinner).toBeVisible();

//   // confirm alert
//   const errorAlert = await errorScreen.findByRole('alert');
//   expect(errorAlert).toHaveTextContent(
//     'There was a problem connecting to the server',
//   );

//   // confirm loading spinner disappears
//   const notLoadingSpinner = errorScreen.queryByRole('progressbar');
//   expect(notLoadingSpinner).not.toBeInTheDocument();
// });
