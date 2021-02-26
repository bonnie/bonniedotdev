import urls from 'Constants/urls';
import { CheatSheet, ItemType } from 'Types';

import useDataFromServer from './useDataFromServer';

const useCheatSheets = (): CheatSheet[] => {
  const cheatSheets = useDataFromServer<CheatSheet[]>(
    urls.cheatSheetsURL,
    ItemType.cheatSheet,
  );
  // sort alphabetically
  return cheatSheets === undefined ? [] : cheatSheets.sort();
};

export default useCheatSheets;
