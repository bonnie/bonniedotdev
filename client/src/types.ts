export type ErrorActionType = {
  type: string,
  payload: (string | null)
}

export type LoadingActionType = {
  type: string,
  payload: boolean,
}

export type UserActionType = {
  type: string,
  payload: (UserType | null)
}

export type ActionType = (ErrorActionType | UserActionType | LoadingActionType)

export type CouponType = {
  id: number,
  price: number,
  code: string,
  utcExpiration: Date,
};

export type ReviewQuoteDisplayType = {
  courseName: string,
  courseLink: string,
  id: number,
  body: string,
};

export type ReviewQuoteType = {
  id: number,
  body: string,
};

export type UserType = {
  id: number,
  username: string,
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
