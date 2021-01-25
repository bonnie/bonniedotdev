import { TalkActionType, TalkType } from '../../Types';
import { actionIds } from '../Actions';

export default function setTalks(
  state = [],
  action: TalkActionType,
): TalkType[] {
  switch (action.type) {
    case actionIds.SET_TALKS: {
      return action.payload ? action.payload : [];
    }
    default:
      return state;
  }
}
