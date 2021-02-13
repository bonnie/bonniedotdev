import { LoadingAction } from '../../Types';
import actionIds from '../Ids';

export function setLoading(): LoadingAction {
  return {
    type: actionIds.SET_LOADING,
    payload: true,
  };
}

export function clearLoading(): LoadingAction {
  return {
    type: actionIds.SET_LOADING,
    payload: false,
  };
}
