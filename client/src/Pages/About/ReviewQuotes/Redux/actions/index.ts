/* eslint-disable no-param-reassign */
import urls from 'Constants/urls';
import jiff from 'jiff';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';
import _ from 'underscore';

import { ReviewQuotesActionType, ReviewQuoteType } from '../../Types';

export const actionIds = {
  SET_REVIEW_QUOTES: 'SET_REVIEW_QUOTES',
};

export function setReviewQuotes(payload: ReviewQuoteType[]): ReviewQuotesActionType {
  return {
    type: actionIds.SET_REVIEW_QUOTES,
    payload,
  };
}

export function setReviewQuotesFromServer() {
  return {
    type: sagaActionIds.SET_DATA_FROM_SERVER,
    payload: {
      url: urls.reviewQuotesURL,
      callback: (data) => setReviewQuotes(data.sort((a, b) => a.body.length - b.body.length)),
    },
  };
}

export function deleteReviewQuote(reviewQuoteId) {
  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.reviewQuoteURL,
      id: reviewQuoteId,
      method: axiosMethodOptions.delete,
      updateStateAction: setReviewQuotesFromServer(),
    },
  };
}

export function addReviewQuote(newData) {
  // remove the id from data to be sent to the server
  const { id } = newData;
  delete newData.id;

  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.reviewQuoteURL,
      method: axiosMethodOptions.post,
      id,
      updateStateAction: setReviewQuotesFromServer(),
      data: newData,
    },
  };
}

export function editReviewQuote(newData, originalData) {
  // remove the id from data for the patch
  const { id } = newData;

  // only deal with keys expected on the server
  const patchRelevantKeys = ['body', 'id', 'courseId'];
  const originalPatchData = _.pick(originalData, ...patchRelevantKeys);
  const newPatchData = _.pick(newData, ...patchRelevantKeys);

  // create a patch for the difference between newData and originalData
  const patch = jiff.diff(originalPatchData, newPatchData);

  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.reviewQuoteURL,
      method: axiosMethodOptions.patch,
      id,
      updateStateAction: setReviewQuotesFromServer(),
      data: patch,
    },
  };
}

// export function setReviewQuotes(payload: ReviewQuoteType[]): ReviewQuotesActionType {
//   return {
//     type: actionIds.SET_REVIEW_QUOTES,
//     payload,
//   };
// }

// export function setReviewQuotesFromServer() {
//   return {
//     type: sagaActionIds.SET_DATA_FROM_SERVER,
//     payload: {
//       url: urls.reviewQuotesURL,
//       callback: (data) => {
//         data.sort((a, b) => a.body.length - b.body.length);
//         setReviewQuotes(data);
//       },
//     },
//   };
// }

// export function deleteReviewQuote(courseId) {
//   return {
//     type: sagaActionIds.EDIT_SERVER_ITEM,
//     payload: {
//       url: urls.reviewQuoteURL,
//       id: courseId,
//       method: axiosMethodOptions.delete,
//       updateStateAction: setReviewQuotesFromServer(),
//     },
//   };
// }

// export function addReviewQuote(reviewQuoteData) {
//   return {
//     type: sagaActionIds.EDIT_SERVER_ITEM,
//     payload: {
//       url: urls.reviewQuoteURL,
//       method: axiosMethodOptions.post,
//       updateStateAction: setReviewQuotesFromServer(),
//       data: reviewQuoteData,
//     },
//   };
// }
