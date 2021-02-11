import { alertLevelOptions } from 'Pages/App/Alert/Types';

import actionIds from '../Ids';
import { AlertActionType } from '../Types';

export function setAlert(
  message: string,
  alertLevel: alertLevelOptions,
): AlertActionType {
  return {
    type: actionIds.SET_ALERT,
    payload: { message, alertLevel },
  };
}

export function clearAlert(): AlertActionType {
  return {
    type: actionIds.SET_ALERT,
  };
}
