import alertLevelOptions from 'Constants/alertLevels';
import { AlertAction, AlertState } from 'State/Types';

import actionIds from '../Actions/Ids';

export default function setAlertState(
  state = null,
  action: AlertAction,
): AlertState | null {
  switch (action.type) {
    case actionIds.SET_ALERT:
      return action.payload || null;
    case actionIds.LOGOUT_USER:
      return {
        message: 'You have been logged out!',
        alertLevel: alertLevelOptions.success,
      };
    case actionIds.LOGIN_USER_RESPONSE:
      // the payload contains the user data or a failure message
      if (action.payload?.message) {
        return {
          message: action.payload.message,
          alertLevel: alertLevelOptions.warning,
        };
      }
      return {
        message: 'Log in succeeded',
        alertLevel: alertLevelOptions.success,
      };
    default:
      return state;
  }
}
