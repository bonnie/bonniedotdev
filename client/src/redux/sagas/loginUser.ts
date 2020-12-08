import { setAlert } from 'Pages/App/Alert/Redux/actions';
import { AlertTypeOptions } from 'Pages/App/Alert/Types';
import { setUser } from 'Pages/Auth/Redux/actions';
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
      callback: (responseData) => {
        if (responseData !== null) {
          // this will re-render and redirect to auth
          return setUser(responseData);
        }
        // TODO: log this to file!
        return (setAlert('Incorrect login', AlertTypeOptions.warning));
      },
    },
  });
}

export default function* watchLoginUser() {
  yield takeEvery(sagaActionIds.LOGIN_USER, loginUser);
}
