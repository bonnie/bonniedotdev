/* eslint-disable max-lines-per-function */
import { findAllByText, fireEvent } from '@testing-library/react';
import urls from 'Constants/urls';
import { rest } from 'msw';
import App from 'Pages/App/App';
import React from 'react';
import server from 'TestUtils/Mocks/server';
import {
  renderWithProvider,
  renderWithRouterAndProvider,
} from 'TestUtils/renderWith';
import { Talk as TalkType } from 'Types';

import Talks from '../Talks';

const pastTalk: TalkType = {
  id: 5,
  title: 'i am a talk',
  utcDateStringISO: '2021-01-25',
  description: 'this talks discusses stuff and it is good',
  slidesFilename: 'http://link-to-slides',
  conferenceName: 'bonnieCon',
  conferenceLink: 'http://bonniecon.com',
  recordingLink: 'http://youtube.com/bonnie',
};

const pastTalkWithoutSlides = { ...pastTalk };
delete pastTalkWithoutSlides.slidesFilename;

test('Renders four talks for non-error server response', async () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testTalksData (see above) for /api/talks

  // render entire App so that we can check Loading and Error
  const screen = renderWithRouterAndProvider(<App />);

  // click the 'about' tab to trigger the talks retrieval
  const talksNavLink = screen.getByRole('tab', { name: /talks/ });
  fireEvent.click(talksNavLink);

  // check titles (all fake titles start with "i am")
  const titles = await screen.findAllByRole('heading', { name: /i am/i });
  expect(titles.length).toBe(4);
});

describe('separates upcoming / future and sorts by date', () => {
  // Note: mocked server response is handled by msw, in the src/mocks folder
  // and src/setupTests.js. The handler is set to return
  // TestUtils/Data/testTalksData (see above) for /api/talks

  test('upcoming talks sorted by date', async () => {
    const allTalksScreen = renderWithProvider(<Talks />);

    const upcomingTalks = await allTalksScreen.findByRole('list', {
      name: 'upcoming-talks-list',
    });

    // wait until dates appear
    const upcomingDates = await findAllByText(
      upcomingTalks,
      /^january \d\d \d\d\d\d/i,
    );

    // check that they're in the expected order
    const dateOrder = upcomingDates.map((date) => date.textContent);
    expect(dateOrder).toEqual(['January 25 2099', 'January 28 2099']);
  });

  test('past talks sorted by reverse date', async () => {
    const allTalksScreen = renderWithProvider(<Talks />);

    const upcomingTalks = await allTalksScreen.findByRole('list', {
      name: 'past-talks-list',
    });

    // wait until dates appear
    const upcomingDates = await findAllByText(
      upcomingTalks,
      /^january \d\d \d\d\d\d/i,
    );

    // check that they're in the expected order
    const dateOrder = upcomingDates.map((date) => date.textContent);
    expect(dateOrder).toEqual(['January 25 2021', 'January 23 2020']);
  });
});

test('Renders note for no upcoming talks', async () => {
  server.resetHandlers(
    rest.get(urls.talksURL, (req, res, ctx) => res(ctx.json([pastTalk]))),
  );

  const allTalksScreen = renderWithProvider(<Talks />);

  const upcomingTalks = await allTalksScreen.findByRole('list', {
    name: 'upcoming-talks-list',
  });
  expect(upcomingTalks).toHaveTextContent('No upcoming talks scheduled.');
});
