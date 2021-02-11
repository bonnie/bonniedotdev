export interface NewReviewQuote {
  body: string;
  courseName?: string;
  courseLink?: string;
  courseId?: number;
}

export interface ReviewQuote extends NewReviewQuote {
  id: number;
}

export interface User {
  id: number;
  username: string;
}

export interface NewCoupon {
  price: number;
  link: string;
  utcExpirationISO: string;
  courseId?: number;
}

export interface Coupon extends NewCoupon {
  id: number;
}

export interface NewCourse {
  name: string;
  description: string;
  link: string;
  imageName: string;
  bestCoupon?: Coupon;
  coupons?: Coupon[];
}

export interface Course extends NewCourse {
  id: number;
}

export interface NewTalk {
  title: string;
  utcDateStringISO: string;
  description: string;
  slidesFilename?: string;
  conferenceName: string;
  conferenceLink: string;
  recordingLink?: string;
}

export interface Talk extends NewTalk {
  id: number;
}

export interface SortedTalks {
  past: Talk[];
  upcoming: Talk[];
}

export enum Size {
  small = 'small',
  inherit = 'inherit',
  large = 'large',
  default = 'default',
}
export enum alertLevelOptions {
  error = 'error',
  info = 'info',
  warning = 'warning',
  success = 'success',
}

export type Data = ReviewQuote | User | Course | Coupon | Talk;
