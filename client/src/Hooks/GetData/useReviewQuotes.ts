import urls from 'Constants/urls';
import { ReviewQuote } from 'Types';

import useAxios from './useAxios';

function sortByLength(reviewQuotes: ReviewQuote[]): ReviewQuote[] {
  // sort by length so that the rows have cells of similar height
  return reviewQuotes.sort((a, b) => a.body.length - b.body.length);
}

const useReviewQuotes = (): ReviewQuote[] => {
  const reviewQuotes = useAxios<ReviewQuote[]>(urls.reviewQuotesURL);
  return reviewQuotes === undefined ? [] : sortByLength(reviewQuotes);
};

export default useReviewQuotes;
