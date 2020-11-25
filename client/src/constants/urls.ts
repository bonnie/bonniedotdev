// literal types need to be really literal -- no variable / template literals allowed
export type CoursesEndpointType = '/api/courses';
export type LoginEndpointType = '/api/login';
export type ReviewQuotesEndpointType = '/api/review_quotes';

export const coursesURL: CoursesEndpointType = '/api/courses';
export const loginURL: LoginEndpointType = '/api/login';
export const reviewQuotesURL: ReviewQuotesEndpointType = '/api/review_quotes';

const urls = {
  reviewQuotesURL,
  loginURL,
  coursesURL,
};

export default urls;
