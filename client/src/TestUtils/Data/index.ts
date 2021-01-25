import moment from 'moment';
import { UserType } from 'Pages/Auth/Types';
import { CourseType } from 'Pages/Courses/Types';
import { TalkType } from 'Pages/Talks/Types';

export const testSuccessLoginReponse: UserType = {
  id: 1,
  username: 'admin',
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
  utcExpirationISO: moment(new Date('2020-11-17T20:01:03.182265+00:00')).toString(),
};

export const courseWithCoupons: CourseType = {
  id: 1,
  name: 'Course 1',
  link: 'https://udemy.com/awesomecourse',
  description: 'Purr get my claw stuck in the dog\'s ear. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox. Making bread on the bathrobe suddenly go on wild-eyed crazy rampage. ',
  bestCoupon: couponWithDate,
  imageName: 'udemy-course-image.jpg',
  coupons: [],
};

export const courseWithoutCoupons: CourseType = {
  id: 2,
  name: 'Course 2',
  link: 'https://udemy.com/simplecourse',
  description: 'Find empty spot in cupboard and sleep all day human give me attention meow and please stop looking at your phone and pet me find empty spot in cupboard and sleep all day for attack the dog then pretend like nothing happened. ',
  imageName: 'udemy-course-image.jpg',
};

export const testCourseData: CourseType[] = [
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

export const CourseJSONWithoutCoupons = courseWithoutCoupons;
export const CourseJSONWithCoupons = {
  ...courseWithCoupons,
  bestCoupon: couponWithString,
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

export const testTalksJSONResponse: TalkType[] = [
  {
    id: 5,
    title: 'i am a talk',
    utcDateStringISO: '2021-01-25',
    description: 'this talks discusses stuff and it is good',
    slidesFilename: 'http://link-to-slides',
    conferenceImageName: 'bonnieCon.png',
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
    conferenceImageName: 'bonnieCon.png',
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
    conferenceImageName: 'bonnieCon.png',
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
    conferenceImageName: 'bonnieCon.png',
    conferenceName: 'bonnieCon',
    conferenceLink: 'http://bonniecon.com',
    recordingLink: 'http://youtube.com/bonnie',
  },
];

/** END: JSON */
