import urls from 'Constants/urls';
import { CheatSheet, ItemType } from 'Types';

import useDataFromServer from './useDataFromServer';

function sortByReverseUpdated(cheatSheets: CheatSheet[]): CheatSheet[] {
  // sort by id for consistent ordering, newest CheatSheet first
  return cheatSheets.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1));
}

const useCheatSheets = (): CheatSheet[] => {
  const cheatSheets = useDataFromServer<CheatSheet[]>(
    urls.cheatSheetsURL,
    ItemType.cheatSheet,
  );
  return cheatSheets === undefined ? [] : sortByReverseUpdated(cheatSheets);
};

export default useCheatSheets;
