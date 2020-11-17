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
  id: number,
  name: string,
  description: string,
  link: string,
  coupons?: Coupon[],
  reviewQuotes?: ReviewQuote[],
};
