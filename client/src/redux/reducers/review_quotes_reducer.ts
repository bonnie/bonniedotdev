import { ReviewQuotesActionType, ReviewQuoteType } from '../../types';
import { actionTypes } from '../actions';

export default function setReviewQuotes(
  state = [],
  action: ReviewQuotesActionType,
): ReviewQuoteType[] {
  switch (action.type) {
    case actionTypes.SET_REVIEW_QUOTES:
      return action.payload ? action.payload : [];
    default:
      return state;
  }
}
