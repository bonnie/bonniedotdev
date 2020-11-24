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
    method, url, data,
  } = payload;
  let responseData = null;
  const errorString = 'There was a problem connecting to the server';
  yield put(setLoading());

  try {
    const response = yield call(() => axios({ method, url, data }));
    responseData = response.data;
  } catch {
    // TODO: log this
    yield put(setError(errorString));
  }
  yield put(clearLoading());

  // finally, yield the response data so that the calling function can make use of it
  yield responseData;
}

export default function* watchGetCoursesFromServer() {
  yield takeEvery(actionTypes.GET_DATA_FROM_SERVER, makeServerRequest);
}
