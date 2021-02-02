export type CouponsActionType = {
  type: string;
  payload?: CouponType[];
};

export type CouponType = {
  id?: number;
  price: number;
  code?: string;
  link: string;
  utcExpirationISO: string;
  courseId?: number;
};
