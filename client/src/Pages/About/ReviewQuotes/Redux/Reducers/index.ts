import { actionIds } from 'Pages/About/ReviewQuotes/Redux/actions';
import { ReviewQuotesActionType, ReviewQuoteType } from 'Pages/About/ReviewQuotes/Types';

export default function setReviewQuotes(
  state = [],
  action: ReviewQuotesActionType,
): ReviewQuoteType[] {
  switch (action.type) {
    case actionIds.SET_REVIEW_QUOTES: {
      // if data is truthy, return it
      if (action.payload) return action.payload.sort((a, b) => a.body.length - b.body.length);

      // otherwise just return an empty array
      return [];
    }
    default:
      return state;
  }
}
