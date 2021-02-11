/* eslint-disable no-param-reassign */
import urls from 'Constants/urls';
import jsonpatch from 'fast-json-patch';
import logToServer from 'Logging/logging';
import sagaActionIds from 'State/Sagas/actionIds';
import { axiosMethodOptions } from 'State/Sagas/Types';
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
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      method: axiosMethodOptions.get,
      url: urls.coursesURL,
      callback: setCourses,
    },
  };
}

export function deleteCourse(courseId) {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.courseURL}/${courseId}`,
      method: axiosMethodOptions.delete,
      callback: setCoursesFromServer,
    },
  };
}

export function addCourse(newData) {
  // remove the id from data to be sent to the server
  delete newData.id;

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: urls.courseURL,
      method: axiosMethodOptions.post,
      callback: setCoursesFromServer,
      data: newData,
    },
  };
}

export function editCourse(newData, originalData) {
  // only deal with keys expected on the server
  const patchRelevantKeys = ['name', 'description', 'link', 'imageName'];
  const originalPatchData = _.pick(originalData, ...patchRelevantKeys);
  const newPatchData = _.pick(newData, ...patchRelevantKeys);

  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalPatchData, newPatchData);

  // edit was called with no differences
  if (patch.length === 0) {
    logToServer('error', 'editCourse was called with no differences');
    return { type: 'noop' };
  }

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.courseURL}/${originalData.id}`,
      method: axiosMethodOptions.patch,
      callback: setCoursesFromServer,
      data: patch,
    },
  };
}
