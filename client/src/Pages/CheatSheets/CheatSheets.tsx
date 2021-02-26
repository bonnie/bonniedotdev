import { cheatSheetDetails } from 'Constants/itemConstants';
import useCheatSheets from 'Hooks/GetData/useCheatSheets';
import useFilterTags from 'Hooks/useFilterTags';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import CheatSheet from './CheatSheet';
import EditCheatSheetFields from './EditCheatSheetFields';

export default function CheatSheets(): ReactElement {
  const cheatSheets = useCheatSheets();
  const [selectedTags, onTagClick, showItem] = useFilterTags();

  return (
    <>
      <Helmet>
        <title>Bonnie Schulkin | Cheat Sheets</title>
        <meta name="description" content="Downloadable Cheat Sheets" />
      </Helmet>
      <PageTitleWithAdd
        title="Cheat Sheets"
        itemDetails={cheatSheetDetails}
        ItemFieldsComponent={<EditCheatSheetFields />}
      />
      {cheatSheets.map((cheatSheetData) => (
        <CheatSheet
          key={cheatSheetData.id}
          cheatSheetData={cheatSheetData}
          selectedTags={selectedTags}
          onTagClick={onTagClick}
          showItem={showItem(cheatSheetData.tags)}
        />
      ))}
    </>
  );
}
