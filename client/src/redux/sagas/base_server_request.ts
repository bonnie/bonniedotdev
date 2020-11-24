import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { ServerRequestPayloadType } from '../../types';
import {
  actionTypes, clearLoading, setError, setLoading,
} from '../actions';

type ServerRequestActionType = {
  type: string,
  payload: ServerRequestPayloadType
}

export function* makeServerRequest({ payload }: ServerRequestActionType) {
  const {
    method, url, data, actionTypeToDispatch,
  } = payload;
  const errorString = 'There was a problem connection to the server';
  yield put(setLoading());

  try {
    const response = yield call(() => axios({ method, url, data }));
    yield put({ type: actionTypeToDispatch, payload: response.data });
  } catch {
    // TODO: log this
    yield put(setError(errorString));
  }
  yield put(clearLoading());
}

export default function* watchGetCoursesFromServer() {
  yield takeEvery(actionTypes.GET_DATA_FROM_SERVER, makeServerRequest);
}
