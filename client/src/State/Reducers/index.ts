import { combineReducers } from 'redux';

import alert from './alertReducer';
import loading from './loadingReducer';
import user from './userReducer';

export default combineReducers({
  user,
  alert,
  loading,
});
