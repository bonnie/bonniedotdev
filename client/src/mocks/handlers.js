/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// TODO ^^ get eslint config in line with auto-formatter
import { rest } from 'msw';

import { testReviewQuotesData } from '../pages/about/ReviewQuotes.test';
import { testCoursesJSONResponse } from '../testUtils/data';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get('/api/review_quotes', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testReviewQuotesData)),
  ),

  rest.get('/api/courses', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testCoursesJSONResponse)),
  ),
];
