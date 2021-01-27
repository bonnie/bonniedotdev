import { ReviewQuoteType } from 'Pages/About/ReviewQuotes/Types';
import { CouponType, CourseType } from 'Pages/Courses/Types';
import { TalkType } from 'Pages/Talks/Types';

export type Size = 'small' | 'inherit' | 'large' | 'default' | undefined;

export type ItemType = TalkType | ReviewQuoteType | CouponType | CourseType;
