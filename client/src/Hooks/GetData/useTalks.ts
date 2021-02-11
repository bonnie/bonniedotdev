import urls from 'Constants/urls';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { SortedTalks, Talk } from 'Types';

import useAxios from '../useAxios';

// eslint-disable-next-line radix
const getUnixTimeInt = (dateString) => moment(dateString).valueOf();
function sortByTimestampDescending(talkA: Talk, talkB: Talk): number {
  return (
    getUnixTimeInt(talkB.utcDateStringISO) -
    getUnixTimeInt(talkA.utcDateStringISO)
  );
}
function sortByTimestampAscending(talkA: Talk, talkB: Talk): number {
  return (
    getUnixTimeInt(talkA.utcDateStringISO) -
    getUnixTimeInt(talkB.utcDateStringISO)
  );
}

// separate talks into past and future, and sort
function sortTalks(talks: Talk[]): SortedTalks {
  // need to fix at midnight or things get wonky with timezones
  const todayDateOnly = moment(new Date()).format('YYYY-MM-DD');
  const today = `${todayDateOnly} 00:00:00`;

  const upcoming = talks
    .filter((talk) => talk.utcDateStringISO >= today)
    .sort(sortByTimestampAscending);
  const past = talks
    .filter((talk) => talk.utcDateStringISO < today)
    .sort(sortByTimestampDescending);

  return { upcoming, past };
}

export default function useTalks(): SortedTalks {
  const [sortedTalks, setSortedTalks] = useState<SortedTalks>({
    past: [],
    upcoming: [],
  });
  const talks = useAxios<Talk[]>(urls.talksURL);
  useEffect(() => {
    if (talks !== undefined) setSortedTalks(sortTalks(talks));
  }, [talks]);

  return sortedTalks;
}
