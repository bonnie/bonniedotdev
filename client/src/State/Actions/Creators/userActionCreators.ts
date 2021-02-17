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
  return async (dispatch: Dispatch<Action>): Promise<Action> => {
    try {
      const response = await axiosInstance({
        url: urls.loginURL,
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
          message: 'There was a problem connecting to the server',
          alertLevel: alertLevelOptions.warning,
        },
      });
    }
  };
};

export function logoutUser(): UserAction {
  return { type: actionIds.LOGOUT_USER };
}
