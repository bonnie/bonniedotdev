import { testCourses } from '../../tests/data';

module.exports = {
  ...jest.requireActual('..'),
  __esModule: true,
  getSecretWord: jest.fn().mockReturnValue(Promise.resolve(testCourses)),
};
