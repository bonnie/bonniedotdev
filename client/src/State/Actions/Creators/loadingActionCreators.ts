import actionIds from '../Ids';
import { LoadingActionType } from '../Types';

export function setLoading(): LoadingActionType {
  return {
    type: actionIds.SET_LOADING,
    payload: true,
  };
}

export function clearLoading(): LoadingActionType {
  return {
    type: actionIds.SET_LOADING,
    payload: false,
  };
}
