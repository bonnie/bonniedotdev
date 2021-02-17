import urls from 'Constants/urls';
import { Course, ItemType } from 'Types';

import useDataFromServer from './useDataFromServer';

const useCourses = (): Course[] => {
  const courses = useDataFromServer<Course[]>(urls.coursesURL, ItemType.course);
  return courses === undefined ? [] : courses;
};

export default useCourses;
