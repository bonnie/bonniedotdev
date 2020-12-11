import { LoadingActionType } from '../../Types';

export const actionIds = {
  SET_LOADING: 'SET_LOADING',
};

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
