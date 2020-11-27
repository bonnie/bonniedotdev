// TODO: use default export and only import one object

export type CoursesActionType = {
  type: string,
  payload?: CourseType[]
}

export type AlertActionType = {
  type: string,
  payload?: AlertConfigType
}

export type LoadingActionType = {
  type: string,
  payload: boolean,
}

export type ReviewQuotesActionType = {
  type: string,
  payload: ReviewQuoteDisplayType[],
}

export type UserActionType = {
  type: string,
  payload?: UserType
}

export type AlertConfigType = {
  message: string,
  alertType: AlertTypeOptions,
}

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

export type UserLoginDataType = {
  username: string,
  password: string,
}

export type CourseType = {
  id: number,
  name: string,
  description: string,
  link: string,
  imageName: string,
  bestCoupon?: CouponType,
  reviewQuotes?: ReviewQuoteType[],
};

export type serverResponseType = (
  CourseType[]
  | ReviewQuoteDisplayType[]
  | UserType
  | null
);

// TODO: can I import this?
export enum axiosMethodEnum {
  get='get',
  GET='GET',
  delete='delete',
  DELETE='DELETE',
  head='head',
  HEAD='HEAD',
  options='options',
  OPTIONS='OPTIONS',
  post='post',
  POST='POST',
  put='put',
  PUT='PUT',
  patch='patch',
  PATCH='PATCH',
  purge='purge',
  PURGE='PURGE',
  link='link',
  LINK='LINK',
  unlink='unlink',
  UNLINK='UNLINK',
}

export enum AlertTypeOptions {
  error='error',
  info='info',
  warning='warning',
  success='success'
}

export type axiosArgsType = {
  method: axiosMethodEnum,
  url: string,
  data?: UserLoginDataType,
}
