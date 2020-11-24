import { UserActionType, UserLoginDataType } from '../../types';
import { actionTypes } from '../actions';

export default function setErrorState(
  state = null,
  action: UserActionType,
): UserLoginDataType | null {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}
