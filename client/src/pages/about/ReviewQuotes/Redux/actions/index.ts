import urls from 'Constants/urls';
import sagaActionIds from 'Redux/Sagas/actionIds';
import { axiosMethodOptions } from 'Redux/Sagas/Types';

import { ReviewQuoteDisplayType, ReviewQuotesActionType } from '../../Types';

export const actionIds = {
  SET_REVIEW_QUOTES: 'SET_REVIEW_QUOTES',
};

export function setReviewQuotes(payload: ReviewQuoteDisplayType[]): ReviewQuotesActionType {
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
      callback: (data) => {
        data.sort((a, b) => a.body.length - b.body.length);
        setReviewQuotes(data);
      },
    },
  };
}

export function deleteReviewQuote(courseId) {
  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.reviewQuoteURL,
      id: courseId,
      method: axiosMethodOptions.delete,
      updateStateAction: setReviewQuotesFromServer(),
    },
  };
}

export function addReviewQuote(reviewQuoteData) {
  return {
    type: sagaActionIds.EDIT_SERVER_ITEM,
    payload: {
      url: urls.reviewQuoteURL,
      method: axiosMethodOptions.post,
      updateStateAction: setReviewQuotesFromServer(),
      data: reviewQuoteData,
    },
  };
}
