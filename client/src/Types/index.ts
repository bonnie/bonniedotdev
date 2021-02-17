import urls from 'Constants/urls';

export interface User {
  id: number;
  username: string;
}

export interface Item {
  id: number;
}
export interface NewReviewQuote {
  body: string;
  courseName?: string;
  courseLink?: string;
  courseId?: number;
}

export interface ReviewQuote extends NewReviewQuote, Item {}

export interface NewCoupon {
  price: number;
  link: string;
  utcExpirationISO: string;
  courseId?: number;
}

export interface Coupon extends NewCoupon, Item {}

export interface NewCourse {
  name: string;
  description: string;
  link: string;
  imageName: string;
  bestCoupon?: Coupon;
  coupons?: Coupon[];
}

export interface Course extends NewCourse, Item {}

export interface NewTalk {
  title: string;
  utcDateStringISO: string;
  description: string;
  slidesFilename?: string;
  conferenceName: string;
  conferenceLink: string;
  recordingLink?: string;
}

export interface Talk extends NewTalk, Item {}

export interface SortedTalks {
  past: Talk[];
  upcoming: Talk[];
}

// TODO: can I group these together with inheritance somehow...?
// Or maybe all of them need a "name" or "title" property...
export type NewItem = NewReviewQuote | NewCoupon | NewCourse | NewTalk;

export interface ItemFieldsComponentProps<ItemData extends Item> {
  data: NewItem | ItemData;
}

export type HeaderVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export enum ItemType {
  talk = 'talk',
  course = 'course',
  coupon = 'coupon',
  reviewQuote = 'reviewQuote',
}

export interface itemEditDetails {
  itemString: string;
  editUrl: urls;
  patchRelevantKeys: string[];
  itemIdentifier: ItemType;
}
