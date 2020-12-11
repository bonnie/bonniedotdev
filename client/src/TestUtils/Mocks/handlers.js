/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
// TODO ^^ get eslint config in line with auto-formatter
import { rest } from 'msw';

import urls from '../../Constants/urls';
import {
  newReviewQuoteJSONResponse,
  testCoursesJSONResponse,
  testReviewQuotesData,
  testSuccessLoginReponse,
} from '../Data';

const handlers = [
  // get all quotes
  rest.get(urls.reviewQuotesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testReviewQuotesData)),
  ),

  // post new quote
  rest.post(urls.reviewQuoteURL, (req, res, ctx) =>
    res(ctx.status(201), ctx.json(newReviewQuoteJSONResponse)),
  ),

  // update a quote
  rest.patch(`${urls.reviewQuoteURL}/:quoteId`, (req, res, ctx) =>
    res(ctx.status(200)),
  ),

  // delete a quote
  rest.delete(`${urls.reviewQuoteURL}/:quoteId`, (req, res, ctx) =>
    res(ctx.status(204)),
  ),

  // get all courses
  rest.get(urls.coursesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testCoursesJSONResponse)),
  ),

  // log in user
  rest.post(urls.loginURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testSuccessLoginReponse)),
  ),
];

export default handlers;
