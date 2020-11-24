import { all, call, spawn } from 'redux-saga/effects';

import watchServerRequests from './base_server_request';
import watchGetCoursesFromServer from './set_courses_from_server';

export default function* rootSaga() {
  const sagas = [watchGetCoursesFromServer, watchServerRequests];

  yield all(
    sagas.map(
      (saga) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        spawn(function* () {
          while (true) {
            try {
              yield call(saga);
              break;
            } catch (e) {
              // TODO: log error
              console.log(e);
            }
          }
        }),
      // eslint-disable-next-line function-paren-newline
    ),
  );
}
