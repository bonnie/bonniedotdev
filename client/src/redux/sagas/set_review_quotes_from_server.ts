import { put, takeEvery } from 'redux-saga/effects';

import { axiosMethodEnum } from '../../types';
import { actionTypes } from '../actions';

export function* setReviewQuotesFromServer() {
  console.log('%%%%%%%%%%%%%%%%%%%%% trying to get quotes from server');
  let responseData = yield put({
    type: actionTypes.GET_DATA_FROM_SERVER,
    payload: {
      method: axiosMethodEnum.get,
      url: '/api/review_quotes',
    },
  });

  // sort the data by length
  if (responseData?.length > 1) {
    responseData = responseData.sort((a, b) => a.body.length - b.body.length);
  }

  yield put({
    type: actionTypes.SET_REVIEW_QUOTES,
    payload: responseData,
  });
}

export default function* watchGetCoursesFromServer() {
  console.log('WATCHING FOR SET_REVIEW_QUOTES_FROM_SERVER');
  yield takeEvery(actionTypes.SET_REVIEW_QUOTES_FROM_SERVER, setReviewQuotesFromServer);
}
