import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

export const sagaMiddleware = createSagaMiddleware();
export const middlewares = [sagaMiddleware];

export default createStore(rootReducer, applyMiddleware(...middlewares));
