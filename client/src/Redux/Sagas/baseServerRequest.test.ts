/* eslint-disable max-lines-per-function */
import moxios from 'moxios';
import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import sagaActionIds from './actionIds';
import { getAxiosResponseData, makeServerRequest } from './baseServerRequest';
import { axiosMethodOptions } from './Types';

describe('test by simulating axios conditions with moxios', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('base server request saga yields as expected on axios success', async () => {
    // set moxios to return success reponse
    moxios.wait(() => {
      console.log('moxios', 'moxios', 'moxios', 'moxios');
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: ['some', 'data'],
      });
    });

    // SETUP: define inputs and create generator
    // const serverPayload: ServerRequestPayloadType = {
    //   method: axiosMethodOptions.get,
    //   url: 'url',
    // };

    // const serverRequestAction: ServerRequestActionType = {
    //   type: sagaActionIds.GET_DATA_FROM_SERVER, payload: serverPayload,
    // };

    // const gen = makeServerRequest(serverRequestAction);
    // // END: setup

    // // first yield should set loading
    // let next = gen.next();
    // expect(next.value).toEqual(
    //   put({ type: sagaActionIds.SET_LOADING, payload: true }),
    // );

    // // next yield should call axios
    // next = gen.next();
    // expect(next.value).toEqual(
    //   call(getAxiosResponseData, serverPayload),
    // );

    // next yield should clear loading
    // TODO: this passes because no error was thrown, but because getAxiosResponseData
    // is never actually called, not because it throws an error
    // Solution: mock getAxiosResponseData...?
    // next = gen.next();
    // expect(next.value).toEqual(
    //   put({ type: sagaActionIds.SET_LOADING, payload: false }),
    // );
  });
});

/// TODO: actually do this test ////////////////////////
// from https://redux-saga.js.org/docs/advanced/Testing.html
// test('integration test with withReducer', () => {
//   return expectSaga(callApi, 'url')
//     .withReducer(rootReducer)
//     .provide([
//       [call(myApi, 'url', value), response]
//     ])
//     .hasFinalState({
//       data: response
//     })
//     .run();
// });
