import { AlertActionType, AlertTypeOptions } from '../../Types';

export const actionIds = {
  SET_ALERT: 'SET_ALERT',
};

export function setAlert(message: string, alertType: AlertTypeOptions): AlertActionType {
  return {
    type: actionIds.SET_ALERT,
    payload: { message, alertType },
  };
}

export function clearAlert(): AlertActionType {
  return {
    type: actionIds.SET_ALERT,
  };
}
