// literal types need to be really literal -- no variable / template literals allowed
export type CoursesEndpointType = '/api/courses';
export type LoginEndpointType = '/api/login';
export type ReviewQuotesEndpointType = '/api/review_quotes';
export type addReviewQuoteEndpointType = '/api/review_quotes/add';

export const coursesURL: CoursesEndpointType = '/api/courses';
export const loginURL: LoginEndpointType = '/api/login';
export const reviewQuotesURL: ReviewQuotesEndpointType = '/api/review_quotes';
export const addReviewQuoteURL: addReviewQuoteEndpointType = '/api/review_quotes/add';

const urls = {
  reviewQuotesURL,
  loginURL,
  coursesURL,
  addReviewQuoteURL,
};

export default urls;
