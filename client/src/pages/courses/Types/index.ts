export type CoursesActionType = {
  type: string,
  payload?: CourseType[]
}

export type CouponType = {
  id?: number, // new coupons don't need an id
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
