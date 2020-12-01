import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';

import urls from '../../../../Constants/urls';
import { CoursesActionType, CourseType } from '../../Types';

export const actionIds = {
  SET_COURSES: 'SET_COURSES',
};

export function setCourses(payload: CourseType[]): CoursesActionType {
  return {
    type: actionIds.SET_COURSES,
    payload,
  };
}

export function setCoursesFromServer() {
  return {
    type: sagaActionIds.SET_DATA_FROM_SERVER,
    payload: {
      url: urls.coursesURL,
      callback: setCourses,
    },
  };
}

export function deleteCourse(courseId) {
  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.courseURL,
      id: courseId,
      method: axiosMethodOptions.delete,
      updateStateAction: setCoursesFromServer(),
    },
  };
}

export function addCourse(courseData) {
  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.courseURL,
      method: axiosMethodOptions.post,
      updateStateAction: setCoursesFromServer(),
      data: courseData,
    },
  };
}
