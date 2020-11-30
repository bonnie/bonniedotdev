import { ReviewQuotesActionType, ReviewQuoteType } from '../../types';
import { actionIds } from '../actions';

export default function setReviewQuotes(
  state = [],
  action: ReviewQuotesActionType,
): ReviewQuoteType[] {
  switch (action.type) {
    case actionIds.SET_REVIEW_QUOTES: {
      // sort the data by length, if there's data
      if (action.payload && action.payload.length > 1) {
        return action.payload.sort((a, b) => a.body.length - b.body.length);
      }
      // otherwise just return an empty array
      return [];
    }
    default:
      return state;
  }
}
