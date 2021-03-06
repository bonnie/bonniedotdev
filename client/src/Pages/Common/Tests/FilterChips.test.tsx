import { fireEvent } from '@testing-library/react';
import CheatSheets from 'Pages/CheatSheets/CheatSheets';
import React from 'react';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

// testing with Cheat Sheets component
// tests specific to other components will be in their test directories
test('clicking chips filters cheat sheets', async () => {
  const screen = renderWithRouterAndProvider(<CheatSheets />);

  // make sure we have four cheat sheets with no filtering
  // msw is using data from Tests/Data testCheatSheetsJSONResponse
  const cheatSheets = await screen.findAllByRole('link', {
    name: /cheat sheet \d/i,
  });
  expect(cheatSheets).toHaveLength(4);

  // find a chip matching 'javascript' and click; should filter down to three cheat sheets
  const javascriptChips = screen.getAllByText('javascript', { exact: true });
  fireEvent.click(javascriptChips[0]);
  const jsCheatSheets = screen.getAllByRole('link', {
    name: /cheat sheet \d/i,
  });
  expect(jsCheatSheets).toHaveLength(3);

  // find a chip matching 'testing' and click; should filter down to two cheat sheets
  const testingChips = screen.getAllByText('testing', { exact: true });
  fireEvent.click(testingChips[0]);
  const testingCheatSheets = screen.getAllByRole('link', {
    name: /cheat sheet \d/i,
  });
  expect(testingCheatSheets).toHaveLength(2);

  // click on testing chip again to de-select; should show three cheat sheets again
  fireEvent.click(testingChips[0]);
  const jsNotTestingCheatSheets = screen.getAllByRole('link', {
    name: /cheat sheet \d/i,
  });
  expect(jsNotTestingCheatSheets).toHaveLength(3);

  // click on "clear filters" to show all again
  const clearFiltersChip = screen.getByText(/clear filters/i);
  fireEvent.click(clearFiltersChip);
  const allCheatSheets = screen.getAllByRole('link', {
    name: /cheat sheet \d/i,
  });
  expect(allCheatSheets).toHaveLength(4);
});
