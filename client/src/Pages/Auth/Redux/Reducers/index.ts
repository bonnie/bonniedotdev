import { UserActionType, UserType } from '../../Types';
import { actionIds } from '../actions';

export default function setUserState(
  state = null,
  action: UserActionType,
): UserType | null {
  switch (action.type) {
    case actionIds.LOGIN_USER_RESPONSE:
      if (action.payload) return action.payload;
      return null;
    case actionIds.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
