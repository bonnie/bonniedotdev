import { applyMiddleware, createStore, Store } from 'redux';

import { middlewares } from '../Redux/configureStore';
import rootReducer from '../Redux/reducers';

/**
 * Create a testing store with imported reducers, middleware, and initial state.
 *  globals: rootReducer, middlewares.
 * @param {object} initialState - Initial state for store.
 * @function storeFactory
 * @returns {Store} - Redux store.
 */
export default function storeFactory(initialState = {}): Store {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}
