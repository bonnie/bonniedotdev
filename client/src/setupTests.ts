import '@testing-library/jest-dom';

import server from './TestUtils/Mocks/server';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

afterEach(() => {
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers();

  // reset any mocks that might have occurred
  jest.resetAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
