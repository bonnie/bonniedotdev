export const actionIds = {
  LOGOUT_USER: 'LOGOUT_USER',
  LOGIN_USER_RESPONSE: 'LOGIN_USER_RESPONSE',
};

export function logoutUser() {
  return { type: actionIds.LOGOUT_USER };
}
