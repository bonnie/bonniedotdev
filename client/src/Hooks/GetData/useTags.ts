import urls from 'Constants/urls';
import { ItemType } from 'Types';

import useDataFromServer from './useDataFromServer';

// the tags endpoint returns an array of strings
const useTags = (): string[] => {
  const tags = useDataFromServer<string[]>(urls.tagsURL, ItemType.tag);
  return tags === undefined ? [] : tags.sort();
};

export default useTags;
