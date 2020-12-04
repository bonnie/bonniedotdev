export type CoursesActionType = {
  type: string,
  payload?: CourseType[]
}

export type CouponType = {
  id: number,
  price: number,
  code: string,
  utcExpirationISO: string,
};

export type CourseType = {
  id: number,
  name: string,
  description: string,
  link: string,
  imageName: string,
  bestCoupon?: CouponType,
  coupons?: CouponType[]
};
