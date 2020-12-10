import { actionIds } from 'Pages/About/ReviewQuotes/Redux/Actions';
import { ReviewQuotesActionType, ReviewQuoteType } from 'Pages/About/ReviewQuotes/Types';

export default function setReviewQuotes(
  state = [],
  action: ReviewQuotesActionType,
): ReviewQuoteType[] {
  switch (action.type) {
    case actionIds.SET_REVIEW_QUOTES: {
      // if data is truthy, return it
      if (action.payload) {
        const x = action.payload.sort((a, b) => a.body.length - b.body.length);
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^ updating quotes to', x);
        return x;
      }

      // otherwise just return an empty array
      return [];
    }
    default:
      return state;
  }
}
