export type CourseProps = {
  name: string,
  coupons: Coupon[],
};

export type Coupon = {
  id: number,
  code: string,
  utcExpiration: Date,
};

export type ReviewQuote = {
  id: number,
  reviewQuote: string,
};

export type CourseType = {
  name: string,
  description: string,
  coupons: Coupon[],
  reviewQuotes: ReviewQuote[],
};
