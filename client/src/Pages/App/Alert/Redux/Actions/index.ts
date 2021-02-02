import { AlertActionType, alertLevelOptions } from '../../Types';

export const actionIds = {
  SET_ALERT: 'SET_ALERT',
};

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
