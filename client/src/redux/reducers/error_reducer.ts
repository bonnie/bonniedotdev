import { ErrorActionType } from '../../types';
import { actionTypes } from '../actions';

export default function setErrorState(state = null, action: ErrorActionType): (string | null) {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return action.payload ? action.payload : null;
    default:
      return state;
  }
}
