import { CourseType, UserType } from '../../types';

export const testSuccessLoginReponse: UserType = {
  id: 1,
  username: 'admin',
};

export const testReviewQuotesData = [
  {
    courseName: 'Course 1',
    courseLink: 'http://test1.org',
    id: 1,
    body: 'body 1',
  },
  {
    courseName: 'Course 2',
    courseLink: 'http://test2.org',
    id: 2,
    body: 'body 2',
  },
  {
    courseName: 'Course 3',
    courseLink: 'http://test3.org',
    id: 3,
    body: 'body 3',
  },
  {
    courseName: 'Course 4',
    courseLink: 'http://test4.org',
    id: 4,
    body: 'body 4',
  },
  {
    courseName: 'Course 5',
    courseLink: 'http://test5.org',
    id: 5,
    body: 'body 5',
  },
];

export const couponWithDate = {
  id: 1,
  code: 'NOT_EXPIRED',
  price: 12.99,
  utcExpiration: new Date('2020-11-17T20:01:03.182265+00:00'),
};

export const reviewQuotes = [
  { id: 1, body: 'This is one of the best instructors I have come across on Udemy. Super clear, very knowledgeable, and straight to the point. There was no time-wasting and she didn\'t move too quickly. The tutorial is very thorough and clear for such a complex topic.' },
  { id: 2, body: 'One of the best courses on Udemy. It was clear, and efficient.' },
];

export const courseWithCouponsAndQuotes: CourseType = {
  id: 1,
  name: 'React Testing with Jest and Enzyme',
  link: 'https://udemy.com/awesomecourse',
  description: 'Purr get my claw stuck in the dog\'s ear. Toilet paper attack claws fluff everywhere meow miao french ciao litterbox. Making bread on the bathrobe suddenly go on wild-eyed crazy rampage. ',
  bestCoupon: couponWithDate,
  imageName: 'udemy-course-image.jpg',
};

export const courseWithoutCouponsAndQuotes: CourseType = {
  id: 2,
  name: 'Regular Expressions for Beginners and Beyond! With Exercises',
  link: 'https://udemy.com/simplecourse',
  description: 'Find empty spot in cupboard and sleep all day human give me attention meow and please stop looking at your phone and pet me find empty spot in cupboard and sleep all day for attack the dog then pretend like nothing happened. ',
  imageName: 'udemy-course-image.jpg',
};

export const testCourses: CourseType[] = [
  courseWithCouponsAndQuotes,
  courseWithoutCouponsAndQuotes,
];

/** JSON */
export const couponWithString = {
  id: 1,
  code: 'NOT_EXPIRED',
  price: 12.99,
  utcExpiration: '2020-11-17T20:01:03.182265+00:00',
};

export const CourseJSONWithoutCouponsAndQuotes = courseWithoutCouponsAndQuotes;
export const CourseJSONWithCouponsAndQuotes = {
  ...courseWithCouponsAndQuotes,
  bestCoupon: couponWithString,
};

export const testCoursesJSONResponse = [
  CourseJSONWithCouponsAndQuotes,
  CourseJSONWithoutCouponsAndQuotes,
];

/** END: JSON */
