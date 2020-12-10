import reviewQuotes from 'Pages/About/ReviewQuotes/Redux/Reducers';
import alert from 'Pages/App/Alert/Redux/Reducers';
import loading from 'Pages/App/Loading/Redux/Reducers';
import user from 'Pages/Auth/Redux/Reducers';
import courses from 'Pages/Courses/Redux/Reducers';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  courses,
  alert,
  loading,
  reviewQuotes,
});
