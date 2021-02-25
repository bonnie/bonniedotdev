import { cheatSheetDetails } from 'Constants/itemConstants';
import useCheatSheets from 'Hooks/GetData/useCheatSheets';
import useFilterTags from 'Hooks/useFilterTags';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement } from 'react';

import CheatSheet from './CheatSheet';
import EditCheatSheetFields from './EditCheatSheetFields';

export default function CheatSheets(): ReactElement {
  const cheatSheets = useCheatSheets();
  const [selectedTags, onTagClick, showItem] = useFilterTags();

  return (
    <>
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
