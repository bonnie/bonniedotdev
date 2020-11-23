import moxios from 'moxios';

import { testCourses, testCoursesJSONResponse } from '../../tests/data';
import { getDataFromServer } from '.';

// TODO update tests when actions have been updated
describe.skip('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('courses response without error', async () => {
    moxios.stubRequest('/api/courses', {
      status: 200,
      response: testCoursesJSONResponse,
    });

    const processedResponse = await getDataFromServer();
    expect(processedResponse).toEqual({ courses: testCourses, error: null });
  });
  test('courses error response', async () => {
    moxios.stubRequest('/api/courses', {
      status: 500,
      response: { message: 'Internal Server Error' },
    });

    return getDataFromServer()
      .catch((output) => expect(output).toEqual({ courses: [], error: 'Failed to retrieve courses' }));
  });
});
