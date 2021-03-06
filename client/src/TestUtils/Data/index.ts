import moment from 'moment';
import { CheatSheet, Course, Talk, User } from 'Types';

export const testSuccessLoginReponse: User = {
  id: 1,
  username: 'admin',
  token: 'abc123',
};

export const testReviewQuotesData = [
  {
    courseName: 'Course 1',
    courseLink: 'http://test1.org',
    id: 1,
    body: 'body 12345',
    courseId: 1,
  },
  {
    courseName: 'Course 2',
    courseLink: 'http://test2.org',
    id: 2,
    body: 'body 2345',
    courseId: 1,
  },
  {
    courseName: 'Course 3',
    courseLink: 'http://test3.org',
    id: 3,
    body: 'body 345',
    courseId: 1,
  },
  {
    courseName: 'Course 4',
    courseLink: 'http://test4.org',
    id: 4,
    body: 'body 45',
    courseId: 1,
  },
  {
    courseName: 'Course 5',
    courseLink: 'http://test5.org',
    id: 5,
    body: 'body 5',
    courseId: 1,
  },
];

export const couponWithDate = {
  id: 1,
  code: 'NOT_EXPIRED',
  link: 'http://link',
  price: 12.99,
  utcExpirationISO: moment(
    new Date('2020-11-17T20:01:03.182265+00:00'),
  ).toString(),
};

export const courseWithCoupons: Course = {
  id: 1,
  name: 'Course 1',
  link: 'https://udemy.com/awesomecourse',
  description:
    "Purr get my claw stuck in the dog's ear. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox. Making bread on the bathrobe suddenly go on wild-eyed crazy rampage. ",
  bestCoupon: couponWithDate,
  imageName: 'udemy-course-image.jpg',
  coupons: [],
};

export const courseWithoutCoupons: Course = {
  id: 2,
  name: 'Course 2',
  link: 'https://udemy.com/simplecourse',
  description:
    'Find empty spot in cupboard and sleep all day human give me attention meow and please stop looking at your phone and pet me find empty spot in cupboard and sleep all day for attack the dog then pretend like nothing happened. ',
  imageName: 'udemy-course-image.jpg',
};

export const testCourseData: Course[] = [
  courseWithCoupons,
  courseWithoutCoupons,
];

/** JSON */
export const couponWithString = {
  id: 1,
  code: 'NOT_EXPIRED',
  price: 12.99,
  link: 'http://course.com?coupon',
  utcExpirationISO: '2020-11-17T20:01:03.182265+00:00',
};

export const anotherCouponWithString = {
  id: 2,
  code: 'NOT_EXPIRED',
  price: 18.99,
  link: 'http://course.com?coupon',
  utcExpirationISO: '2028-11-17T20:01:03.182265+00:00',
};

export const CourseJSONWithoutCoupons = courseWithoutCoupons;
export const CourseJSONWithCoupons = {
  ...courseWithCoupons,
  bestCoupon: couponWithString,
  coupons: [couponWithString, anotherCouponWithString],
};

export const testCoursesJSONResponse = [
  CourseJSONWithCoupons,
  CourseJSONWithoutCoupons,
];

export const newReviewQuoteJSONResponse = {
  courseId: 5,
  courseName: 'Course 5',
  courseLink: 'http://test5.org',
  id: 12,
  body: 'What a great course!',
};

export const testTalksJSONResponse: Talk[] = [
  {
    id: 5,
    title: 'i am a talk',
    utcDateStringISO: '2021-01-25',
    description: 'this talks discusses stuff and it is good',
    slidesFilename: 'http://link-to-slides',
    conferenceName: 'bonnieCon',
    conferenceLink: 'http://bonniecon.com',
    recordingLink: 'http://youtube.com/bonnie',
  },
  {
    id: 3,
    title: 'i am an older talk',
    utcDateStringISO: '2020-01-23',
    description: 'this talks discusses stuff and it is good',
    slidesFilename: 'http://link-to-slides',
    conferenceName: 'bonnieCon',
    conferenceLink: 'http://bonniecon.com',
    recordingLink: 'http://youtube.com/bonnie',
  },
  {
    id: 8,
    title: 'i am further in the foooture',
    utcDateStringISO: '2099-01-28',
    description: 'this talks discusses stuff and it is also good',
    slidesFilename: 'http://link-to-slides',
    conferenceName: 'bonnieCon',
    conferenceLink: 'http://bonniecon.com',
    recordingLink: 'http://youtube.com/bonnie',
  },
  {
    id: 7,
    title: 'i am a talk in the foooture',
    utcDateStringISO: '2099-01-25',
    description: 'this talks discusses stuff and it is also good',
    slidesFilename: 'http://link-to-slides',
    conferenceName: 'bonnieCon',
    conferenceLink: 'http://bonniecon.com',
    recordingLink: 'http://youtube.com/bonnie',
  },
];

export const testCheatSheetsJSONResponse: CheatSheet[] = [
  {
    id: 1,
    title: 'Cheat Sheet 1',
    fileName: 'cheat sheet 1.pdf',
    version: '1.0',
    updatedAt: '2020-02-02',
    tagNames: ['testing', 'javascript', 'enzyme'],
  },
  {
    id: 2,
    title: 'Cheat Sheet 2',
    fileName: 'cheat sheet 2.pdf',
    version: '2.0',
    updatedAt: '2020-02-02',
    tagNames: ['regular expressions', 'javascript', 'syntax'],
  },
  {
    id: 3,
    title: 'Cheat Sheet 3',
    fileName: 'cheat sheet 3.pdf',
    version: '3.0',
    updatedAt: '2020-02-02',
    tagNames: ['regular expressions', 'python', 'syntax'],
  },
  {
    id: 4,
    title: 'Cheat Sheet 4',
    fileName: 'cheat sheet 4.pdf',
    version: '4.0',
    updatedAt: '2020-02-02',
    tagNames: ['testing', 'javascript', 'testing library'],
  },
];

/** END: JSON */
