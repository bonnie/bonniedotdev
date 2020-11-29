import { CoursesActionType, CourseType } from '../../types';
import { actionTypes } from '../actions';

export default function setCourses(state = [], action: CoursesActionType): CourseType[] {
  switch (action.type) {
    case actionTypes.SET_COURSES:
      console.log('REDUCER SETS COURSES TO', action.payload); return action.payload ? action.payload : [];
    default:
      return state;
  }
}
