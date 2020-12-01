import { CoursesActionType, CourseType } from '../../Types';
import { actionIds } from '../actions';

export default function setCourses(state = [], action: CoursesActionType): CourseType[] {
  switch (action.type) {
    case actionIds.SET_COURSES:
      return action.payload ? action.payload : [];
    default:
      return state;
  }
}
