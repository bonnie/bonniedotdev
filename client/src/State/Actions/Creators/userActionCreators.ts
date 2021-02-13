import axios from 'axios';
import alertLevelOptions from 'Constants/alertLevels';
import urls from 'Constants/urls';
import { AlertAction, UserAction } from 'State/Types';

import actionIds from '../Ids';

export interface LoginUserPayload {
  username: string;
  password: string;
}

// TODO: thunkify
export async function loginUser({
  username,
  password,
}: LoginUserPayload): Promise<UserAction | AlertAction> {
  try {
    const response = await axios.post(urls.loginURL, {
      data: { username, password },
      validateStatus: (status) => {
        return (status >= 200 && status < 300) || status === 400;
      },
    });
    return {
      type: actionIds.LOGIN_USER_RESPONSE,
      payload: response.data,
    };
  } catch {
    // TODO: log this
    return {
      type: actionIds.SET_ALERT,
      payload: {
        message: 'Login failed',
        alertLevel: alertLevelOptions.warning,
      },
    };
  }
}

export function logoutUser(): UserAction {
  return { type: actionIds.LOGOUT_USER };
}
