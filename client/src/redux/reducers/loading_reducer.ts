import { LoadingActionType } from '../../types';
import { actionTypes } from '../actions';

export default function setLoadingState(
  state = false,
  action: LoadingActionType,
): boolean {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}
