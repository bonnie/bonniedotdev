import { render } from '@testing-library/react';
import React from 'react';

import { reviewQuotes } from '../../tests/data';
import ReviewQuotes from './ReviewQuotes';

test.skip('test here', () => {
  render(<ReviewQuotes reviewQuotesData={reviewQuotes} />);
});
