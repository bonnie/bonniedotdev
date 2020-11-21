import axios from 'axios';

import { translateCouponValuesToDates } from '../helpers';
import { CourseType } from '../types';

export interface CoursesResponse {
  courses: CourseType[];
  error: string|null;
}

export async function getCoursesFromServer(): Promise<CoursesResponse> {
  try {
    const response = await axios.get('/api/courses');
    if (response.status === 200) {
      let courses = response.data;
      courses = courses.map((course) => translateCouponValuesToDates(course));

      return { courses, error: null };
    }
  } catch {
    return { courses: [], error: 'Failed to retrieve courses' };
  }
  // if we get here, something went terribly wrong
  return { courses: [], error: 'Failed to retrieve courses' };
}
