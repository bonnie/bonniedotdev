/* eslint-disable no-param-reassign */
import urls from 'Constants/urls';
import jiff from 'jiff';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';
import _ from 'underscore';

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
      callback: (data) => setCourses(data.sort((a, b) => a.name < b.name)),
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

export function addCourse(newData) {
  // remove the id from data to be sent to the server
  const { id } = newData;
  delete newData.id;

  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.courseURL,
      method: axiosMethodOptions.post,
      id,
      updateStateAction: setCoursesFromServer(),
      data: newData,
    },
  };
}

export function editCourse(newData, originalData) {
  // remove the id from data for the patch
  const { id } = newData;

  // only deal with keys expected on the server
  const patchRelevantKeys = ['name', 'description', 'link', 'imageName'];
  const originalPatchData = _.pick(originalData, ...patchRelevantKeys);
  const newPatchData = _.pick(newData, ...patchRelevantKeys);

  // create a patch for the difference between newData and originalData
  const patch = jiff.diff(originalPatchData, newPatchData);

  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.courseURL,
      method: axiosMethodOptions.patch,
      id,
      updateStateAction: setCoursesFromServer(),
      data: patch,
    },
  };
}
