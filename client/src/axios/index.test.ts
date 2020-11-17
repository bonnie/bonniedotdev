import moxios from 'moxios';
import { getCoursesFromServer } from '.';
import { testCoursesJSONResponse, testCourses } from '../tests/data';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('courses response without error', async () => {
    moxios.stubRequest('/courses', {
      status: 200,
      response: testCoursesJSONResponse,
    });

    const processedResponse = await getCoursesFromServer();
    expect(processedResponse).toEqual({ courses: testCourses, error: null });
  });
  test('courses error response', async () => {
    moxios.stubRequest('/courses', {
      status: 500,
      response: { message: 'Internal Server Error' },
    });

    return getCoursesFromServer()
      .catch((output) => expect(output).toEqual({ courses: [], error: 'Failed to retrieve courses' }));
  });
});
