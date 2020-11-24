import { combineReducers } from 'redux';

import auth from './auth_reducer';
import courses from './courses_reducer';
import error from './error_reducer';
import loading from './loading_reducer';
import reviewQuotes from './review_quotes_reducer';

export default combineReducers({
  auth,
  courses,
  error,
  loading,
  reviewQuotes,
});
