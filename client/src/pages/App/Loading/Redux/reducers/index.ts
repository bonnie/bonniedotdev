import { LoadingActionType } from '../../Types';
import { actionIds } from '../Actions';

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
