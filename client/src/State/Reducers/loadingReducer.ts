import { LoadingAction } from 'State/Types';

import actionIds from '../Actions/Ids';

export default function setLoadingState(
  state = false,
  action: LoadingAction,
): boolean {
  switch (action.type) {
    case actionIds.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}
