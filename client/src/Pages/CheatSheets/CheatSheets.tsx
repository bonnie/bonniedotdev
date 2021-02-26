import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
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
  const { selectedTags, onTagClick, clearSelected, showItem } = useFilterTags();

  return (
    <>
      <Helmet>
        <title>Bonnie Schulkin | Cheat Sheets</title>
        <meta name="description" content="Downloadable Cheat Sheets" />
      </Helmet>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: 1020, // TODO: this needs to be relative to max paper width
        }}
      >
        <Box style={{ alignSelf: 'start' }}>
          <PageTitleWithAdd
            title="Cheat Sheets"
            itemDetails={cheatSheetDetails}
            ItemFieldsComponent={<EditCheatSheetFields />}
          />
        </Box>
        <Chip
          label="clear filters"
          color="secondary"
          onClick={clearSelected}
          style={{ alignSelf: 'end' }}
        />
      </Box>
      {cheatSheets.map((cheatSheetData) => (
        <CheatSheet
          key={cheatSheetData.id}
          cheatSheetData={cheatSheetData}
          selectedTags={selectedTags}
          onTagClick={onTagClick}
          showItem={showItem(cheatSheetData.tagNames)}
        />
      ))}
    </>
  );
}
