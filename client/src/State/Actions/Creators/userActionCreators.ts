import axios from 'axios';
import alertLevelOptions from 'Constants/alertLevels';
import urls, { serverPrefix } from 'Constants/urls';
import { Dispatch } from 'redux';
import { AlertAction, UserAction } from 'State/Types';

import actionIds from '../Ids';

type Action = AlertAction | UserAction;

export interface LoginUserPayload {
  username: string;
  password: string;
}

export const loginUser = ({ username, password }: LoginUserPayload) => {
  return async (dispatch: Dispatch<Action>): Promise<Action> => {
    try {
      const response = await axios({
        url: `${serverPrefix}/${urls.loginURL}`,
        method: 'POST',
        data: { username, password },
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 400;
        },
        headers: { 'Content-Type': 'application/json' },
      });
      return dispatch({
        type: actionIds.LOGIN_USER_RESPONSE,
        payload: response.data,
      });
    } catch (e) {
      // TODO: log this
      return dispatch({
        type: actionIds.SET_ALERT,
        payload: {
          message: 'Login failed',
          alertLevel: alertLevelOptions.warning,
        },
      });
    }
  };
};

// export function loginUser({
//   username,
//   password,
// }: LoginUserPayload): UserAction {
//   return {
//     type: actionIds.LOGIN_USER_RESPONSE,
//     payload: { id: 5, username: 'sjela' },
//   };
// }
export function logoutUser(): UserAction {
  return { type: actionIds.LOGOUT_USER };
}
