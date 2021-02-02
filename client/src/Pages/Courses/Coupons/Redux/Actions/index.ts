/* eslint-disable no-param-reassign */
import urls from 'Constants/urls';
import { setCoursesFromServer } from 'Pages/Courses/Redux/Actions';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';

import { CouponType } from '../../Types';

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

export function editCoupon(couponData: CouponType) {
  // TODO: only deal with keys expected on the server
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.couponURL}/${couponData.id}`,
      method: axiosMethodOptions.put,
      updateStateAction: setCoursesFromServer(),
      data: couponData,
    },
  };
}
