import { actionIds as authActionIds } from 'Pages/Auth/Redux/Actions';

import { AlertActionType, AlertConfigType, alertLevelOptions } from '../../Types';
import { actionIds } from '../Actions';

export default function setAlertState(
  state = null, action: AlertActionType,
): (AlertConfigType | null) {
  switch (action.type) {
    case actionIds.SET_ALERT:
      return action.payload || null;
    case authActionIds.LOGOUT_USER:
      return { message: 'You have been logged out!', alertLevel: alertLevelOptions.success };
    case authActionIds.LOGIN_USER_RESPONSE:
      // the payload contains the user data or a failure message
      if (action.payload?.message) {
        return { message: action.payload.message, alertLevel: alertLevelOptions.warning };
      }
      return { message: 'Log in succeeded', alertLevel: alertLevelOptions.success };
    default:
      return state;
  }
}
