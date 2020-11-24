import { combineReducers } from 'redux';

import auth from './auth_reducer';
import courses from './courses_reducer';
import error from './error_reducer';
import loading from './loading_reducer';

export default combineReducers({
  auth,
  courses,
  error,
  loading,
});
