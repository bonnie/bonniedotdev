import urls from 'Constants/urls';
import { Course, ItemType } from 'Types';

import useAxios from './useAxios';

const useCourses = (): Course[] => {
  const courses = useAxios<Course[]>(urls.coursesURL, ItemType.course);
  return courses === undefined ? [] : courses;
};

export default useCourses;
