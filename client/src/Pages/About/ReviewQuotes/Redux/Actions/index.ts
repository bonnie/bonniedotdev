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
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      method: axiosMethodOptions.get,
      url: urls.reviewQuotesURL,
      callback: setReviewQuotes,
    },
  };
}

export function deleteReviewQuote(reviewQuoteId) {
  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.reviewQuoteURL}/{reviewQuoteId}`,
      method: axiosMethodOptions.delete,
      callback: setReviewQuotesFromServer,
    },
  };
}

export function addReviewQuote(newData) {
  // remove the id from data to be sent to the server
  delete newData.id;

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: urls.reviewQuoteURL,
      method: axiosMethodOptions.post,
      updateStateAction: setReviewQuotesFromServer(),
      data: newData,
    },
  };
}

export function editReviewQuote(newData, originalData) {
  // only deal with keys expected on the server
  const patchRelevantKeys = ['body', 'courseId'];
  const originalPatchData = _.pick(originalData, ...patchRelevantKeys);
  const newPatchData = _.pick(newData, ...patchRelevantKeys);

  // create a patch for the difference between newData and originalData
  const patch = jiff.diff(originalPatchData, newPatchData);

  return {
    type: sagaActionIds.SERVER_REQUEST,
    payload: {
      url: `${urls.reviewQuoteURL}/{newData.id}`,
      method: axiosMethodOptions.patch,
      updateStateAction: setReviewQuotesFromServer(),
      data: patch,
    },
  };
}
