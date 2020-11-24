import { put, takeEvery } from 'redux-saga/effects';

import { axiosMethodEnum } from '../../types';
import { actionTypes } from '../actions';

export function* setCoursesFromServer() {
  yield put({
    type: actionTypes.GET_DATA_FROM_SERVER,
    payload: {
      method: axiosMethodEnum.get,
      url: '/api/courses',
      actionTypeToDispatch: actionTypes.SET_COURSES,
    },
  });
}

export default function* watchGetCoursesFromServer() {
  yield takeEvery(actionTypes.SET_COURSES_FROM_SERVER, setCoursesFromServer);
}
