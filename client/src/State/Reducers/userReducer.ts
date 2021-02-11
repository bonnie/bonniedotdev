import { UserActionType, UserType } from 'Pages/Auth/Types';

import actionIds from '../Actions/Ids';

const USER_LOCALSTORAGE_KEY = 'bonniedotdev_user';
function getUserFromStorage(): UserType | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export default function setUserState(
  state = getUserFromStorage(),
  action: UserActionType,
): UserType | null {
  switch (action.type) {
    case actionIds.LOGIN_USER_RESPONSE:
      if (action.payload && action.payload.id) {
        // save in localstorage to persist login
        localStorage.setItem(
          USER_LOCALSTORAGE_KEY,
          JSON.stringify(action.payload),
        );
        return action.payload;
      }
      return null;
    case actionIds.LOGOUT_USER:
      // remove from localstorage
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      return null;
    default:
      return state;
  }
}
