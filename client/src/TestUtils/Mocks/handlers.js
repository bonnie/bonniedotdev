/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// TODO ^^ get eslint config in line with auto-formatter
import { rest } from 'msw';

import urls from '../../Constants/urls';
import {
  testCoursesJSONResponse,
  testReviewQuotesData,
  testSuccessLoginReponse,
} from '../Data';

const handlers = [
  rest.get(urls.reviewQuotesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testReviewQuotesData)),
  ),
  rest.post(urls.reviewQuoteURL, (req, res, ctx) => res(ctx.status(201))),

  rest.get(urls.coursesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testCoursesJSONResponse)),
  ),

  rest.post(urls.loginURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testSuccessLoginReponse)),
  ),
];

export default handlers;
