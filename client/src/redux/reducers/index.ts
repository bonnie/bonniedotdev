import { combineReducers } from 'redux';

import alert from './alert_reducer';
import courses from './courses_reducer';
import loading from './loading_reducer';
import reviewQuotes from './review_quotes_reducer';
import user from './user_reducer';

export default combineReducers({
  user,
  courses,
  alert,
  loading,
  reviewQuotes,
});
