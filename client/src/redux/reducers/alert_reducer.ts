import { AlertActionType, AlertConfigType } from '../../types';
import { actionTypes } from '../actions';

export default function setAlertState(
  state = null, action: AlertActionType,
): (AlertConfigType | null) {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}
