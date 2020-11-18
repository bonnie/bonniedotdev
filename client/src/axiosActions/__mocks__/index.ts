import { testCourses } from '../../tests/data';

module.exports = {
  ...jest.requireActual('..'),
  __esModule: true,
  getCoursesFromServer: jest.fn().mockResolvedValue({ courses: testCourses, error: null }),
};
