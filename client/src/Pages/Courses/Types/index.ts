import { CouponType } from '../Coupons/Types';

export type CoursesActionType = {
  type: string;
  payload?: CourseType[];
};

export interface NewCourseType {
  name: string;
  description: string;
  link: string;
  imageName: string;
  bestCoupon?: CouponType;
  coupons?: CouponType[];
}

export interface CourseType extends NewCourseType {
  id: number;
}
