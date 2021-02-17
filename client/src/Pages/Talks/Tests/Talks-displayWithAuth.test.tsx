import { fireEvent } from '@testing-library/react';
import App from 'Pages/App/App';
import React from 'react';
import { renderWithRouterProviderAndUser } from 'TestUtils/renderWith';

test('Displays talks when logged in', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testTalksData (see above) for /api/talks

  // render entire App so that we can check Loading and Error
  const loadingScreen = await renderWithRouterProviderAndUser(<App />);

  // click the 'about' tab to trigger the review talks retrieval
  const talkNavLink = loadingScreen.getByRole('tab', { name: /talk/ });
  fireEvent.click(talkNavLink);

  // check titles (all fake titles start with "i am")
  const titles = await loadingScreen.findAllByRole('heading', {
    name: /i am/i,
  });
  expect(titles.length).toBe(4);
});
