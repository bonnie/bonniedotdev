import urls from 'Constants/urls';
import { Course, ItemType } from 'Types';

import useDataFromServer from './useDataFromServer';

function sortById(courses: Course[]): Course[] {
  // sort by id for consistent ordering, newest course first
  return courses.sort((a, b) => b.id - a.id);
}

const useCourses = (): Course[] => {
  const courses = useDataFromServer<Course[]>(urls.coursesURL, ItemType.course);
  return courses === undefined ? [] : sortById(courses);
};

export default useCourses;
