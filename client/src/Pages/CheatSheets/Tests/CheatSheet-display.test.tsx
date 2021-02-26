import CheatSheet from 'Pages/CheatSheets/CheatSheet';
import React from 'react';
import { renderWithRouterAndProvider } from 'TestUtils/renderWith';

const cheatSheetData = {
  id: 1,
  title: 'Cheat Sheet 1',
  fileName: 'cheat sheet 1.pdf',
  version: '1.0',
  updatedAt: '2020-02-02',
  tags: ['testing', 'javascript', 'enzyme'],
};

test('cheat sheet paper has title, download link and tags', async () => {
  // cheat sheet title comes from "urlify"ing cheat sheet
  // returned by msw, definded in Test/Data
  const screen = renderWithRouterAndProvider(
    <CheatSheet
      cheatSheetData={cheatSheetData}
      onTagClick={jest.fn()}
      selectedTags={[]}
      showItem
    />,
  );

  const title = await screen.findByText('Cheat Sheet 1');
  expect(title).toBeInTheDocument();

  // actual download tested in e2e tests
  const downloadLink = screen.getByTitle('download cheat sheet');
  expect(downloadLink).toBeInTheDocument();

  const jsTag = screen.getByText('javascript', { exact: true });
  expect(jsTag).toBeInTheDocument();
});
