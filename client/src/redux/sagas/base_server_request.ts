import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { ServerRequestActionType, ServerRequestPayloadType } from '../../types';
import {
  actionTypes, clearLoading, setError, setLoading,
} from '../actions';

export const getAxiosResponseData = async (axiosConfig: ServerRequestPayloadType) => {
  // any errors will bubble up
  const response = await axios(axiosConfig);
  return response.data;
};

export function* makeServerRequest({ payload }: ServerRequestActionType) {
  let responseData = null;
  const errorString = 'There was a problem connecting to the server';
  yield put(setLoading());

  try {
    // const responseA = await axios({ method, url, data });
    responseData = yield call(getAxiosResponseData, payload);
    // const response = yield axios({ method, url, data });
    // const response = yield call('.'.join(['a', 'b']), 'hooha');
  } catch (e) {
    // TODO: log this
    yield put(setError(errorString));
  }
  yield put(clearLoading());
  // finally, return the response data so that the calling function can make use of it
  // QUESTION: is this even a thing with a generator?
  // return responseData;
}

export default function* watchGetCoursesFromServer() {
  yield takeEvery(actionTypes.GET_DATA_FROM_SERVER, makeServerRequest);
}
