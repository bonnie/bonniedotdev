import { actionIds as authActionIds } from 'Pages/Auth/Redux/actions';

import { AlertActionType, AlertConfigType, alertLevelOptions } from '../../Types';
import { actionIds } from '../actions';

export default function setAlertState(
  state = null, action: AlertActionType,
): (AlertConfigType | null) {
  switch (action.type) {
    case actionIds.SET_ALERT:
      return action.payload || null;
    case authActionIds.LOGOUT_USER:
      return { message: 'You have been logged out!', alertLevel: alertLevelOptions.success };
    case authActionIds.LOGIN_USER_RESPONSE:
      // the payload contains the user data. It will be null if the login did not succeed.
      if (action.payload) return { message: 'Log in succeeded', alertLevel: alertLevelOptions.success };
      return { message: 'Log in failed', alertLevel: alertLevelOptions.warning };
    default:
      return state;
  }
}
