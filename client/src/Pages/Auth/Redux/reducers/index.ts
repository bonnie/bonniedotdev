import { UserActionType, UserType } from '../../Types';
import { actionIds } from '../actions';

export default function setUserState(
  state = null,
  action: UserActionType,
): UserType | null {
  switch (action.type) {
    case actionIds.SET_USER:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}
