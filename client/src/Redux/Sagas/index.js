import { all, call, spawn } from 'redux-saga/effects';

import watchServerRequests from './baseServerRequest';
import watchEditServerItem from './editServerItem';
import watchLoginUser from './loginUser';
import watchSetDataFromServer from './setDataFromServer';

export default function* rootSaga() {
  const sagas = [
    watchSetDataFromServer,
    watchServerRequests,
    watchEditServerItem,
    watchLoginUser,
  ];

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
