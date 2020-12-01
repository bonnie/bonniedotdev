// reference: https://github.com/Lemoncode/redux-sagas-typescript-by-example

import axios from 'axios';
import { setAlert } from 'Pages/App/Alert/Redux/actions';
import { AlertTypeOptions } from 'Pages/App/Alert/Types';
import { clearLoading, setLoading } from 'Pages/App/Loading/Redux/actions';
import { call, put, takeEvery } from 'redux-saga/effects';

import sagaActionIds from './actionIds';
import { axiosArgsType } from './Types';

export const getAxiosResponseData = async (axiosConfig) => {
  // any errors will bubble up
  const response = await axios(axiosConfig);
  return response.data;
};

interface makeServerRequestArgs {
  type: string
  payload: axiosArgsType
}

export function* makeServerRequest({ payload }:makeServerRequestArgs) {
  let responseData = null;
  const errorString = 'There was a problem connecting to the server';
  yield put(setLoading());

  // store callback before removing it for axios
  const { callback } = payload;
  const axiosArgs = payload;

  // remove the callback from the axios args if it's there
  if (axiosArgs.callback) delete axiosArgs.callback;

  if (process.env.NODE_ENV === 'development') {
    // for development, use flask server running in background
    axiosArgs.url = `http://localhost:5050${axiosArgs.url}`;
  }

  try {
    responseData = yield call(getAxiosResponseData, axiosArgs);
  } catch (e) {
    // TODO: log this to file
    console.error('error calling server', e);
    yield put(setAlert(errorString, AlertTypeOptions.error));
  }
  yield put(clearLoading());

  // finally, run the callback on the data
  if (callback) { callback(responseData); }
}

export default function* watchMakeServerRequest() {
  yield takeEvery(sagaActionIds.SERVER_REQUEST, makeServerRequest);
}
