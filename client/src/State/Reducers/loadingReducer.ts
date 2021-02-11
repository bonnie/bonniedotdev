import actionIds from '../Actions/actionIds';
import { LoadingActionType } from '../Actions/Types';

export default function setLoadingState(
  state = false,
  action: LoadingActionType,
): boolean {
  switch (action.type) {
    case actionIds.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}
