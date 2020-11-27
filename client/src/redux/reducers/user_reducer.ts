import { UserActionType, UserType } from '../../types';
import { actionTypes } from '../actions';

export default function setUserState(
  state = null,
  action: UserActionType,
): UserType | null {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}
