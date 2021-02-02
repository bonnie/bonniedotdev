import { CouponType } from '../Coupons/Types';

export type CoursesActionType = {
  type: string;
  payload?: CourseType[];
};

export type CourseType = {
  id: number | null;
  name: string;
  description: string;
  link: string;
  imageName: string;
  bestCoupon?: CouponType;
  coupons?: CouponType[];
};
