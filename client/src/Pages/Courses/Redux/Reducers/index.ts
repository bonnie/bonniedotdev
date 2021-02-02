import { CoursesActionType, CourseType } from '../../Types';
import { actionIds } from '../Actions';

function sortCoursesByIdReverse(courses: CourseType[]): CourseType[] {
  return courses.sort((a, b) => (a.id > b.id ? 1 : 0));
}

export default function setCourses(
  state = [],
  action: CoursesActionType,
): CourseType[] {
  switch (action.type) {
    case actionIds.SET_COURSES:
      return action.payload ? sortCoursesByIdReverse(action.payload) : [];
    default:
      return state;
  }
}
