import alertLevelOptions from 'Constants/alertLevels';

import { AlertAction } from '../../Types';
import actionIds from '../Ids';

export function setAlert(
  message: string,
  alertLevel: alertLevelOptions,
): AlertAction {
  return {
    type: actionIds.SET_ALERT,
    payload: { message, alertLevel },
  };
}

export function clearAlert(): AlertAction {
  return {
    type: actionIds.SET_ALERT,
  };
}
