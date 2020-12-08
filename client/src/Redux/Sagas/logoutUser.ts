import { setAlert } from 'Pages/App/Alert/Redux/actions';
import { AlertTypeOptions } from 'Pages/App/Alert/Types';
import { clearUser } from 'Pages/Auth/Redux/actions';
import { put, takeEvery } from 'redux-saga/effects';

import sagaActionIds from './actionIds';

export function* logoutUser() {
  // log the user out
  yield put(clearUser());

  // set a success message
  yield put(setAlert('You have been logged out!', AlertTypeOptions.success));
}

export default function* watchLoginUser() {
  yield takeEvery(sagaActionIds.LOGOUT_USER, logoutUser);
}
