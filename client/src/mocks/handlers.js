/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// TODO ^^ get eslint config in line with auto-formatter
import { rest } from 'msw';

import urls from '../constants/urls';
import {
  testCoursesJSONResponse,
  testReviewQuotesData,
  testSuccessLoginReponse,
} from '../testUtils/data';

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  rest.get(urls.reviewQuotesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testReviewQuotesData)),
  ),

  rest.get(urls.coursesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testCoursesJSONResponse)),
  ),

  rest.post(urls.loginURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testSuccessLoginReponse)),
  ),
];
