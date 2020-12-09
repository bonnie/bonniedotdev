import { actionIds as authActionIds } from 'Pages/Auth/Redux/actions';
import { put, takeEvery } from 'redux-saga/effects';

import urls from '../../Constants/urls';
import sagaActionIds from './actionIds';
import { axiosMethodOptions } from './Types';

interface actionType {
  type: string, // TODO make more specific to this action?
  payload: {
      username: string,
      password: string
  }
}

export function* loginUser({ payload }: actionType) {
  yield put({
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: urls.loginURL,
      method: axiosMethodOptions.POST,
      data: { ...payload },
      callback: (responseData) => ({
        type: authActionIds.LOGIN_USER_RESPONSE,
        payload: responseData,
      }),
    },
  });
}

export default function* watchLoginUser() {
  yield takeEvery(sagaActionIds.LOGIN_USER, loginUser);
}
