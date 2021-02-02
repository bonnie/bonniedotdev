import { ReviewQuoteType } from 'Pages/About/ReviewQuotes/Types';
import { CouponType } from 'Pages/Courses/Coupons/Types';
import { CourseType } from 'Pages/Courses/Types';
import { TalkType } from 'Pages/Talks/Types';

export type Size = 'small' | 'inherit' | 'large' | 'default' | undefined;

export type ItemType = TalkType | ReviewQuoteType | CouponType | CourseType;
