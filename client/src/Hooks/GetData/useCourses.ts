import urls from 'Constants/urls';
import { Course } from 'Types';

import useAxios from './useAxios';

const useCourses = (): Course[] => {
  const courses = useAxios<Course[]>(urls.coursesURL);
  return courses === undefined ? [] : courses;
};

export default useCourses;
