import reviewQuotes from 'Pages/About/ReviewQuotes/Redux/reducers';
import alert from 'Pages/App/Alert/Redux/reducers';
import loading from 'Pages/App/Loading/Redux/reducers';
import user from 'Pages/Auth/Redux/reducers';
import courses from 'Pages/Courses/Redux/reducers';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  courses,
  alert,
  loading,
  reviewQuotes,
});
