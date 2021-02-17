/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import App from 'Pages/App/App';
import React from 'react';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

test('Renders four ReviewQuotes and course links for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testReviewQuotesData (see above) for /api/ReviewQuotes

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the ReviewQuotes retrieval
  const aboutNavLink = screen.getByRole('tab', { name: /about/ });
  fireEvent.click(aboutNavLink);

  // check quotes
  const quotes = await screen.findAllByText(/body \d/);
  expect(quotes.length).toBe(5);

  // check course links
  const courseLinks = screen.getAllByRole('link', { name: /Course \d/ });
  expect(courseLinks.length).toBe(5);
  courseLinks.forEach((course) => expect(course).toHaveAttribute('href'));
});
