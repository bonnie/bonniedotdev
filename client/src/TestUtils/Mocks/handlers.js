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
  testTalksJSONResponse,
} from '../Data';

const handlers = [
  // ////////////// review quotes /////////// //
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

  // ////////////// courses /////////// //
  // get all courses
  rest.get(urls.coursesURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testCoursesJSONResponse)),
  ),

  // ////////////// talks /////////// //
  // get all talks
  rest.get(urls.talksURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testTalksJSONResponse)),
  ),

  // update a talk
  rest.patch(`${urls.talkURL}/:talkId`, (req, res, ctx) =>
    res(ctx.status(200)),
  ),

  // delete a talk
  rest.delete(`${urls.talkURL}/:talkId`, (req, res, ctx) =>
    res(ctx.status(204)),
  ),

  // ////////////// log in /////////// //
  // log in user
  rest.post(urls.loginURL, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(testSuccessLoginReponse)),
  ),
];

export default handlers;
