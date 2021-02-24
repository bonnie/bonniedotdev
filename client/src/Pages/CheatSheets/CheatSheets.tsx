import { cheatSheetDetails } from 'Constants/itemConstants';
import useCheatSheets from 'Hooks/GetData/useCheatSheets';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement, useState } from 'react';

import CheatSheet from './CheatSheet';
import EditCheatSheetFields from './EditCheatSheetFields';

export default function CheatSheets(): ReactElement {
  const cheatSheets = useCheatSheets();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagOnClick = (tag: string): void => {
    // add tag to selectedTags if it's not there, or remove it if it's there
    let newSelectedTags: string[];
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(
        (selectedTag) => selectedTag !== tag,
      );
    } else {
      newSelectedTags = [...selectedTags];
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <>
      <PageTitleWithAdd
        title="Cheat Sheets"
        itemDetails={cheatSheetDetails}
        ItemFieldsComponent={<EditCheatSheetFields />}
      />
      {cheatSheets.map((cheatSheetData) => (
        <CheatSheet
          cheatSheetData={cheatSheetData}
          selectedTags={selectedTags}
          tagOnClick={tagOnClick}
        />
      ))}
    </>
  );
}
