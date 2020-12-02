import { Action } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';

import sagaActionIds from './actionIds';
import { axiosMethodOptions } from './Types';

interface actionType {
  type: string, // TODO make more specific to this action?
  payload: {
    url: string,
    id: number,
    method: axiosMethodOptions,
    updateStateAction: Action<any>,
    data?: any,
  }
}

export function* editServerItem({ payload }:actionType) {
  // if id is negative, this is actually a new item
  console.log('--------------------> editing server item', payload);

  const url = (payload.id < 0) ? payload.url : `${payload.url}/${payload.id}`;

  yield put({
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url,
      method: payload.method,
      data: payload.data,
      actionCreatorCallback: () => payload.updateStateAction,
    },
  });
}

export default function* watchEditServerItem() {
  yield takeEvery(sagaActionIds.EDIT_SERVER_ITEM, editServerItem);
}
