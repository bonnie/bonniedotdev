import moment from 'moment';

import { TalkActionType, TalkStateType, TalkType } from '../../Types';
import { actionIds } from '../Actions';

// eslint-disable-next-line radix
const getUnixTimeInt = (dateString) => parseInt(moment(dateString, 'X').toString());
function sortByTimestamp(talkA: TalkType, talkB: TalkType): number {
  return getUnixTimeInt(talkB.utcDateStringISO) - getUnixTimeInt(talkA.utcDateStringISO);
}

// separate talks into past and future, and sort
function separateTalks(talks: TalkType[]): TalkStateType {
  const today = moment(new Date()).toISOString();
  const upcoming = talks
    .filter((talk) => talk.utcDateStringISO >= today)
    .sort(sortByTimestamp);
  const past = talks
    .filter((talk) => talk.utcDateStringISO < today)
    .sort(sortByTimestamp);

  return { upcoming, past };
}

export default function setTalks(
  state = { past: [], upcoming: [] },
  action: TalkActionType,
): TalkStateType {
  switch (action.type) {
    case actionIds.SET_TALKS: {
      return separateTalks(action.payload ? action.payload : []);
    }
    default:
      return state;
  }
}
