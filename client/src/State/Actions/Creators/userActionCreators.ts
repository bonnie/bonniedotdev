import axiosInstance from 'AxiosInstance';
import alertLevelOptions from 'Constants/alertLevels';
import urls from 'Constants/urls';
import { Dispatch } from 'redux';
import { AlertAction, UserAction } from 'State/Types';

import actionIds from '../Ids';

type Action = AlertAction | UserAction;

export interface LoginUserPayload {
  username: string;
  password: string;
}

export const loginUser = ({ username, password }: LoginUserPayload) => {
  // eslint-disable-next-line sonarjs/cognitive-complexity
  return async (dispatch: Dispatch<Action>): Promise<Action> => {
    try {
      const response = await axiosInstance({
        url: urls.loginURL,
        method: 'POST',
        data: { username, password },
        validateStatus: (status) => {
          return (
            (status >= 200 && status < 300) || status === 400 || status === 401
          );
        },
        headers: { 'Content-Type': 'application/json' },
      });
      // anything 500+ will go to the `catch` block
      if (response.status >= 400 && response.data.message) {
        return dispatch({
          type: actionIds.SET_ALERT,
          payload: {
            message: response.data.message,
            alertLevel: alertLevelOptions.warning,
          },
        });
      }
      return dispatch({
        type: actionIds.LOGIN_USER_RESPONSE,
        payload: response.data,
      });
    } catch (e) {
      return dispatch({
        type: actionIds.SET_ALERT,
        payload: {
          message: 'There was a problem connecting to the server',
          alertLevel: alertLevelOptions.error,
        },
      });
    }
  };
};

export function logoutUser(): UserAction {
  return { type: actionIds.LOGOUT_USER };
}
