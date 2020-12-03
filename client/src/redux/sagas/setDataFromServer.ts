import { Action } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';

import sagaActionIds from './actionIds';
import { axiosMethodOptions } from './Types';

interface actionType {
  type: string, // TODO make more specific to this action?
  payload: {
    // TODO unify this type with the one in Redux/Sagas/Types
    callback: (data) => Action<any>;
    url: string,
  }
}

export function* setDataFromServer({ payload }: actionType) {
  const data = yield put({
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      method: axiosMethodOptions.get,
      ...payload,
    },
  });
}

export default function* watchSetDataFromServer() {
  yield takeEvery(sagaActionIds.SET_DATA_FROM_SERVER, setDataFromServer);
}
