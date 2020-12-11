import { actionIds } from 'Pages/About/ReviewQuotes/Redux/Actions';
import { ReviewQuotesActionType, ReviewQuoteType } from 'Pages/About/ReviewQuotes/Types';

function sortByPositiveIdThenLength(reviewQuotes: ReviewQuoteType[]): ReviewQuoteType[] {
  // sort by length so that the rows have cells of similar height
  // But put any new quotes not on server (negative ID) at the end
  return reviewQuotes.sort((a, b) => {
    if (a.id < 0 && b.id < 0) return a.id - b.id;
    if (a.id < 0) return 1;
    return a.body.length - b.body.length;
  });
}

export default function setReviewQuotes(
  state = [],
  action: ReviewQuotesActionType,
): ReviewQuoteType[] {
  switch (action.type) {
    case actionIds.SET_REVIEW_QUOTES: {
      // if data is truthy, return it
      if (action.payload) {
        return sortByPositiveIdThenLength(action.payload);
      }
      // otherwise just return an empty array
      return [];
    }
    default:
      return state;
  }
}
