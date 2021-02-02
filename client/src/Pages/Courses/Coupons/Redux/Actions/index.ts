/* eslint-disable no-param-reassign */
import urls from 'Constants/urls';
import jsonpatch from 'fast-json-patch';
import logToServer from 'Logging/logging';
import { setCoursesFromServer } from 'Pages/Courses/Redux/Actions';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';
import _ from 'underscore';

export function deleteCoupon(CouponId) {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.couponURL}/${CouponId}`,
      method: axiosMethodOptions.delete,
      callback: setCoursesFromServer,
    },
  };
}

export function addCoupon(newData) {
  // remove the id from data to be sent to the server
  delete newData.id;

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: urls.couponURL,
      method: axiosMethodOptions.post,
      callback: setCoursesFromServer,
      data: newData,
    },
  };
}

export function editCoupon(newData, originalData) {
  // only deal with keys expected on the server
  const patchRelevantKeys = [
    'link',
    'price',
    'utcExpirationISO',
    'courseId',
    'id',
  ];

  const originalPatchData = _.pick(originalData, ...patchRelevantKeys);
  const newPatchData = _.pick(newData, ...patchRelevantKeys);

  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalPatchData, newPatchData);

  // edit was called with no differences
  if (patch.length === 0) {
    logToServer('error', 'editCoupon was called with no differences');
    return { type: 'noop' };
  }

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.couponURL}/${originalData.id}`,
      method: axiosMethodOptions.patch,
      updateStateAction: setCoursesFromServer(),
      data: patch,
    },
  };
}
