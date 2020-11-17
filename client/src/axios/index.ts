import axios from 'axios';
import { CourseType } from '../types';

export interface CoursesResponse {
  courses: CourseType[];
  error: string|null;
}

export async function getCoursesFromServer(): Promise<CoursesResponse> {
  const response = await axios.get('./courses');
  return response.data();
}
