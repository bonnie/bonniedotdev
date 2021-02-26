/* eslint-disable max-lines-per-function */
import { fireEvent } from '@testing-library/react';
import App from 'Pages/App/App';
import React from 'react';
import {
  renderWithRouterAndProvider,
  renderWithRouterProviderAndUser,
} from 'TestUtils/renderWith';

describe.each`
  renderMethod                       | description
  ${renderWithRouterAndProvider}
  ${renderWithRouterProviderAndUser}
`('$description', ({ renderMethod }) => {
  test('Renders four CheatSheets and course links', async () => {
    // Note: mocked server response is handled by msw, in the src/mocks folder
    // and src/setupTests.js. The handler is set to return
    // TestUtils/Data/testCheatSheetsData for /api/cheatsheets

    const screen = renderMethod(<App />);

    // click the 'cheetsheets' tab to trigger the CheatSheets retrieval
    const cheatSheetNavLink = screen.getByRole('tab', { name: /cheatsheets/ });
    fireEvent.click(cheatSheetNavLink);

    // check cheatsheets
    const cheatSheets = await screen.findAllByText(/Cheat Sheet \d/i);
    expect(cheatSheets.length).toBe(4);
  });
});
