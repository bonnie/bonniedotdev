export type CouponType = {
  id: number,
  price: number,
  code: string,
  utcExpiration: Date,
};

export type ReviewQuoteType = {
  id: number,
  reviewQuote: string,
};

export type ReviewQuotesByCourseType = {
  courseName: string,
  reviewQuotes: ReviewQuoteType[],
}[];

export type CourseType = {
  id: number,
  name: string,
  description: string,
  link: string,
  imageName: string,
  bestCoupon?: CouponType,
  reviewQuotes?: ReviewQuoteType[],
};
