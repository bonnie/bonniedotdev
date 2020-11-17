/* eslint-disable import/prefer-default-export */
import { CourseType } from '../types';

/**
 * Translate coupon JSON response date from ISO string to Date
 * @param courses JSON response from server, with coupon as an ISO string
 */
export function translateCouponValuesToDates(course): CourseType {
  if (course.coupons) {
    // eslint-disable-next-line no-param-reassign
    course.coupons = course.coupons.map((coupon) => ({
      ...coupon,
      utcExpiration: new Date(coupon.utcExpiration),
    }));
  }
  return course;
}
