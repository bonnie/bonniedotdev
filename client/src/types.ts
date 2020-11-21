export type CouponType = {
  id: number,
  price: number,
  code: string,
  utcExpiration: Date,
};

export type ReviewQuoteType = {
  courseName: string,
  courseLink: string,
  id: number,
  body: string,
};

export type CourseType = {
  id: number,
  name: string,
  description: string,
  link: string,
  imageName: string,
  bestCoupon?: CouponType,
  reviewQuotes?: ReviewQuoteType[],
};
