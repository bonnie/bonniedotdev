/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { rest } from 'msw';

import { testReviewQuotesData } from '../pages/about/ReviewQuotes.test';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  // Handles a POST /login request

  rest.get('/api/review_quotes', (req, res, ctx) =>
    res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json(testReviewQuotesData),
    ),
  ),
];
