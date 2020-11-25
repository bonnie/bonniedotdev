import { applyMiddleware, createStore } from 'redux';

import { sagaMiddleware } from '../redux/configureStore';
import rootReducer from '../redux/reducers';
import rootSaga from '../redux/sagas';

/**
 * @function storeFactory
 * Create a testing store with imported reducers, saga middleware, and initial state.
 * @param {object} initialState - Initial state for store.
 * @returns {Store} - Redux store.
 */
export default function storeFactory(initialState) {
  sagaMiddleware.run(rootSaga);
  return createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
}
