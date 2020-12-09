import { actionIds as authActionIds } from 'Pages/Auth/Redux/actions';

import { AlertActionType, AlertConfigType } from '../../Types';
import { actionIds } from '../actions';

export default function setAlertState(
  state = null, action: AlertActionType,
): (AlertConfigType | null) {
  switch (action.type) {
    case actionIds.SET_ALERT:
      return action.payload || null;
    case authActionIds.LOGOUT_USER:
      return action.payload || null;
    default:
      return state;
  }
}
