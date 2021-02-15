enum urls {
  couponURL = '/api/coupon',
  courseURL = '/api/course',
  coursesURL = '/api/courses',
  loginURL = '/api/login',
  logURL = '/api/log',
  reviewQuoteURL = '/api/review_quote',
  reviewQuotesURL = '/api/review_quotes',
  talkURL = '/api/talk',
  talksURL = '/api/talks',
}

export default urls;

export const serverPrefix =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5050' : '';
