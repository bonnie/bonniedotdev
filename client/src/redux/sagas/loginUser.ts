import { put, takeEvery } from 'redux-saga/effects';

import urls from '../../constants/urls';
import { AlertTypeOptions, axiosMethodEnum } from '../../types';
import { actionIds, setAlert, setUser } from '../actions';

interface actionType {
  type: string, // TODO make more specific to this action?
  payload: {
    url: string,
    id: number,
    method: axiosMethodEnum,
    updateStateActionType: string,
    data?: any,
  }
}

export function* loginUser({ payload }: actionType) {
  yield put({
    type: actionIds.SERVER_REQUEST,
    url: urls.loginURL,
    method: axiosMethodEnum.POST,
    data: payload.data,
    callback: (responseData) => {
      if (responseData !== null) {
        // this will re-render and redirect to auth
        put(setUser(responseData));
      } else {
        // TODO: log this!
        put(setAlert('Incorrect login', AlertTypeOptions.warning));
      }
    },
  });

  // update state
  yield put({ type: payload.updateStateActionType });
}

export default function* watchLoginUser() {
  yield takeEvery(actionIds.LOGIN_USER, loginUser);
}
