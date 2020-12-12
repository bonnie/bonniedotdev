import urls from 'Constants/urls';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';

export const actionIds = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGIN_USER_RESPONSE: 'LOGIN_USER_RESPONSE',
};

export function loginUser(payload) {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: urls.loginURL,
      method: axiosMethodOptions.POST,
      data: {
        username: payload.username,
        password: payload.password,
      },
      // don't fail on 400 response
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400;
      },
      callback: (responseData) => ({
        type: actionIds.LOGIN_USER_RESPONSE,
        payload: responseData,
      }),
    },
  };
}

export function logoutUser() {
  return { type: actionIds.LOGOUT_USER };
}
