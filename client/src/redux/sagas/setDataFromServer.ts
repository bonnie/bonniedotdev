import { put, takeEvery } from 'redux-saga/effects';

import { axiosMethodEnum } from '../../types';
import { actionIds } from '../actions';

interface actionType {
  type: string, // TODO make more specific to this action?
  payload: {
    callback: (data) => void;
    url: string,
  }
}

export function* setDataFromServer({ payload }: actionType) {
  yield put({
    type: actionIds.SERVER_REQUEST,
    payload: {
      method: axiosMethodEnum.get,
      ...payload,
    },
  });
}

export default function* watchSetDataFromServer() {
  yield takeEvery(actionIds.SET_DATA_FROM_SERVER, setDataFromServer);
}
