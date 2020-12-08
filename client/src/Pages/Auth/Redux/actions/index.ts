import { UserActionType, UserType } from '../../Types';

export const actionIds = {
  SET_USER: 'SET_USER',
};

export function setUser(userData: UserType): UserActionType {
  return {
    type: actionIds.SET_USER,
    payload: userData,
  };
}

export function clearUser(): UserActionType {
  return {
    type: actionIds.SET_USER,
  };
}
