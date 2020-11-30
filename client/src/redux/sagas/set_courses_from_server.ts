import { put, takeEvery } from 'redux-saga/effects';

import { axiosMethodEnum } from '../../types';
import { actionIds, setCourses } from '../actions';

export function* setCoursesFromServer() {
  console.log('^&^&^&^&^&^&^&^&^& setting courses!!');
  const courses = yield put({
    type: actionIds.GET_DATA_FROM_SERVER,
    payload: {
      method: axiosMethodEnum.get,
      url: '/api/courses',
      actionTypeToDispatch: actionIds.SET_COURSES,
      callback: setCourses,
    },
  });
}

export default function* watchSetCoursesFromServer() {
  yield takeEvery(actionIds.SET_COURSES_FROM_SERVER, setCoursesFromServer);
}
