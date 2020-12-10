import { CoursesActionType, CourseType } from '../../Types';
import { actionIds } from '../Actions';

function sortCoursesAlphabetically(courses: CourseType[]): CourseType[] {
  return courses.sort((a, b) => (a.name < b.name ? 1 : 0));
}

export default function setCourses(state = [], action: CoursesActionType): CourseType[] {
  switch (action.type) {
    case actionIds.SET_COURSES:
      return action.payload ? sortCoursesAlphabetically(action.payload) : [];
    default:
      return state;
  }
}
