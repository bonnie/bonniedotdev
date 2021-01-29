import { render, screen } from '@testing-library/react';
import React from 'react';

import Talk from '../Talk';
import { TalkType } from '../Types';

const talkData: TalkType = {
  id: 5,
  title: 'i am a talk',
  utcDateStringISO: '2021-01-25',
  description: 'this talks discusses stuff and it is good',
  slidesFilename: 'slides.pdf',
  conferenceName: 'bonnieCon',
  conferenceLink: 'http://bonniecon.com',
  recordingLink: 'http://youtube.com/bonnie',
};

const pastTalkWithoutSlides = { ...talkData };
delete pastTalkWithoutSlides.slidesFilename;

const pastTalkWithoutRecording = { ...talkData };
delete pastTalkWithoutRecording.recordingLink;

test('All data displays for complete talk data', () => {
  render(<Talk talkData={talkData} editButtons={null} />);

  const title = screen.getByRole('heading', { name: 'i am a talk' });
  expect(title).toBeInTheDocument();

  const date = screen.getByText('January 25 2021');
  expect(date).toBeInTheDocument();

  const description = screen.getByText('this talks discusses stuff and it is good');
  expect(description).toBeInTheDocument();

  const conferenceLink = screen.getByRole('link', { name: 'bonnieCon' });
  expect(conferenceLink).toBeInTheDocument();
  expect(conferenceLink).toHaveAttribute('href', 'http://bonniecon.com');

  const slidesLink = screen.getByRole('link', { name: /slides/i });
  expect(slidesLink).toBeInTheDocument();
  expect(slidesLink).toHaveAttribute('href', '/static/images/slides/slides.pdf');

  const recordingLink = screen.getByRole('link', { name: /recording/i });
  expect(recordingLink).toBeInTheDocument();
  expect(recordingLink).toHaveAttribute('href', 'http://youtube.com/bonnie');
});
test('Slide link does not display when there is no link', () => {
  render(<Talk talkData={pastTalkWithoutSlides} editButtons={null} />);

  const slidesLink = screen.queryByRole('link', { name: /slides/i });
  expect(slidesLink).not.toBeInTheDocument();
});
test('Recording link does not display when there is no link', () => {
  render(<Talk talkData={pastTalkWithoutRecording} editButtons={null} />);

  const recordingLink = screen.queryByRole('link', { name: /recording/i });
  expect(recordingLink).not.toBeInTheDocument();
});
