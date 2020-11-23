import { combineReducers } from 'redux';

import auth from './auth_reducer';
import error from './error_reducer';
import loading from './loading_reducer';

export default combineReducers({
  error,
  loading,
  auth,
});
