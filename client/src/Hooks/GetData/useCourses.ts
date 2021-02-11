import urls from 'Constants/urls';
import { Course } from 'Types';

import useAxios from '../useAxios';

const useCourses = async (): Promise<Course[]> => {
  const courses = await useAxios<Course[]>(urls.coursesURL);
  return courses === undefined ? [] : courses;
};

export default useCourses;
