import { UserActionType, UserType } from '../../types';
import { actionTypes } from '../actions';

export default function setErrorState(
  state = null,
  action: UserActionType,
): UserType | null {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state;
  }
}
