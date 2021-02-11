import logToServer from 'Logging/logging';
import { all, call, spawn } from 'redux-saga/effects';

import watchServerRequests from './serverRequest';

export default function* rootSaga() {
  const sagas = [watchServerRequests];

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
              logToServer('error', `Saga error: ${e}`);
            }
          }
        }),
      // eslint-disable-next-line function-paren-newline
    ),
  );
}
