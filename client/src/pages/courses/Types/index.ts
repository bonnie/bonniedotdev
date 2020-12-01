export type CoursesActionType = {
  type: string,
  payload?: CourseType[]
}

export type CouponType = {
  id: number,
  price: number,
  code: string,
  utcExpiration: Date,
};

export type CourseType = {
  id: number,
  name: string,
  description: string,
  link: string,
  imageName: string,
  bestCoupon?: CouponType,
};
