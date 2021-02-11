import urls from 'Constants/urls';
import { ReviewQuote } from 'Types';

import useAxios from '../useAxios';

const useReviewQuotes = (): ReviewQuote[] => {
  const reviewQuotes = useAxios<ReviewQuote[]>(urls.reviewQuotesURL);
  return reviewQuotes === undefined ? [] : reviewQuotes;
};

export default useReviewQuotes;
