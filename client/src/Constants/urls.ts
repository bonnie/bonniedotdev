// literal types need to be really literal -- no variable / template literals allowed
export type CourseEndpointType = '/api/course'
export type CoursesEndpointType = '/api/courses';
export type LoginEndpointType = '/api/login';
export type ReviewQuoteEndpointType = '/api/review_quote';
export type ReviewQuotesEndpointType = '/api/review_quotes';

export const coursesURL: CoursesEndpointType = '/api/courses';
export const courseURL: CourseEndpointType = '/api/course';
export const loginURL: LoginEndpointType = '/api/login';
export const reviewQuoteURL: ReviewQuoteEndpointType = '/api/review_quote';
export const reviewQuotesURL: ReviewQuotesEndpointType = '/api/review_quotes';

const urls = {
  coursesURL,
  courseURL,
  loginURL,
  reviewQuoteURL,
  reviewQuotesURL,
};

export default urls;
