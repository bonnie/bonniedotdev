export type CouponsActionType = {
  type: string;
  payload?: CouponType[];
};

export interface NewCouponType {
  price: number;
  link: string;
  utcExpirationISO: string;
  courseId?: number;
}

export interface CouponType extends NewCouponType {
  id: number;
}
