/* eslint-disable no-param-reassign */
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
      actionCreatorCallback: (data) => setCourses(data),
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
  // remove the id from data to be sent to the server
  const { id } = courseData;
  delete courseData.id;

  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.courseURL,
      method: axiosMethodOptions.post,
      id,
      updateStateAction: setCoursesFromServer(),
      data: courseData,
    },
  };
}
