import { AlertActionType, alertLevelOptions } from 'Pages/App/Alert/Types';

import { UserActionType, UserType } from '../../Types';

export const actionIds = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
};

export function setUser(userData: UserType): UserActionType {
  return {
    type: actionIds.SET_USER,
    payload: userData,
  };
}

export function clearUser() {
  return {
    type: actionIds.LOGOUT_USER,
  };
}
