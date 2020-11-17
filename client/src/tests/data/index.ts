import { CourseType } from '../../types';

export const couponsWithDate = [
  {
    id: 1,
    code: 'NOT_EXPIRED',
    utcExpiration: new Date('2020-11-17T20:01:03.182265+00:00'),
  },
  {
    id: 2,
    code: 'EXPIRED',
    utcExpiration: new Date('2020-11-17T20:01:03.182265+00:00'),
  },
];

export const courseWithCouponsAndQuotes: CourseType = {
  id: 1,
  name: 'Awesome Course',
  link: 'https://udemy.com/awesomecourse',
  description: 'Whatta course!',
  coupons: couponsWithDate,
  reviewQuotes: [
    { id: 1, reviewQuote: 'the best!' },
    { id: 2, reviewQuote: 'meh' },
  ],
};

export const courseWithoutCouponsAndQuotes: CourseType = {
  id: 2,
  name: 'Simple Course',
  link: 'https://udemy.com/simplecourse',
  description: 'simple, but good',
};

export const testCourses: CourseType[] = [
  courseWithCouponsAndQuotes,
  courseWithoutCouponsAndQuotes,
];

/** JSON */
export const couponsWithString = [
  {
    id: 1,
    code: 'NOT_EXPIRED',
    utcExpiration: '2020-11-17T20:01:03.182265+00:00',
  },
  {
    id: 2,
    code: 'EXPIRED',
    utcExpiration: '2020-11-17T20:01:03.182265+00:00',
  },
];

export const CourseJSONWithoutCouponsAndQuotes = courseWithoutCouponsAndQuotes;
export const CourseJSONWithCouponsAndQuotes = {
  ...courseWithCouponsAndQuotes,
  coupons: couponsWithString,
};

export const testCoursesJSONResponse = [
  CourseJSONWithCouponsAndQuotes,
  CourseJSONWithoutCouponsAndQuotes,
];
/** END: JSON */
