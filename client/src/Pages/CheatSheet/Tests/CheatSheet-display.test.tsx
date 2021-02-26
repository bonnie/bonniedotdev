import App from 'Pages/App/App';
import React from 'react';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

// mock PDFDoc to be a function that returns null,
// since react-pdf is difficult to test; will test in e2e
jest.mock('Pages/Common/PDFDoc', () => () => null);

test('cheat sheet has title, download link and tags', async () => {
  // cheat sheet title comes from "urlify"ing cheat sheet
  // returned by msw, definded in Test/Data
  const screen = renderWithRouterAndProvider(<App />, {
    initialRouterEntries: ['/cheatsheets/cheat-sheet-1'],
  });

  const title = await screen.findByText('Cheat Sheet 1');
  expect(title).toBeInTheDocument();

  // actual download tested in e2e tests
  const downloadLink = screen.getByTitle('download cheat sheet');
  expect(downloadLink).toBeInTheDocument();

  const jsTag = screen.getByText('javascript', { exact: true });
  expect(jsTag).toBeInTheDocument();
});

test('nonexistent cheat sheet shows link to cheat sheets list', async () => {
  const screen = renderWithRouterAndProvider(<App />, {
    initialRouterEntries: ['/cheatsheets/not-a-sheet'],
  });
  const cheatSheetsLink = await screen.findByRole('link', {
    name: /cheat sheets overview/i,
  });
  expect(cheatSheetsLink).toBeInTheDocument();
});
