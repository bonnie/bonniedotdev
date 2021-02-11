import { combineReducers } from 'redux';

import alert from './alertReducer';
import loading from './loadingReducer';
import user from './userReducer';

const reducers = combineReducers({
  user,
  alert,
  loading,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
