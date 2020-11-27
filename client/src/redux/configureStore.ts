import { applyMiddleware, createStore } from 'redux';

// import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

export const middlewares = [];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default createStoreWithMiddleware(rootReducer);
