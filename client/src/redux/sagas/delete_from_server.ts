import { put, takeEvery } from 'redux-saga/effects';

import { axiosMethodEnum } from '../../types';
import { actionIds, setReviewQuotes } from '../actions';

export function* setReviewQuotesFromServer() {
  yield put({
    type: actionIds.GET_DATA_FROM_SERVER,
    payload: {
      method: axiosMethodEnum.get,
      url: '/api/review_quotes',
      callback: setReviewQuotes,
    },
  });
}

export default function* watchGetCoursesFromServer() {
  yield takeEvery(actionIds.SET_REVIEW_QUOTES_FROM_SERVER, setReviewQuotesFromServer);
}
