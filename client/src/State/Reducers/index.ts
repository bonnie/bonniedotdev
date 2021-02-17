import { combineReducers } from 'redux';

import alert from './alertReducer';
import user from './userReducer';

const reducers = combineReducers({
  user,
  alert,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
