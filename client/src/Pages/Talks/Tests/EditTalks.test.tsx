/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { renderWithProvider } from 'TestUtils/renderWith';

import EditTalk from '../EditTalk';
import { TalkRangeType, TalkType } from '../Types';

const testTalkData: TalkType = {
  id: 5,
  title: 'i am a talk',
  utcDateStringISO: '2021-01-25',
  description: 'this talks discusses stuff and it is good',
  slidesFilename: 'slides.pdf',
  conferenceImageName: 'bonnieCon.png',
  conferenceName: 'bonnieCon',
  conferenceLink: 'http://bonniecon.com',
  recordingLink: 'http://youtube.com/bonnie',
};

const editTalkProps = {
  talkData: testTalkData,
  deleteTalkFromState: jest.fn(),
  setAddButton: jest.fn(),
  createWholeRowCell: jest.fn(),
  talkIndex: 1,
  talkRange: TalkRangeType.past,
};

// eslint-disable-next-line max-lines-per-function
describe.skip('Test form render details for individual talk', () => {
  test('renders talk form', () => {
    const screen = renderWithProvider(<EditTalk {...editTalkProps} />);
    const talkForm = screen.getByRole('form', { name: /talk \d+/i });
    expect(talkForm).toBeInTheDocument();
  });

  test('renders talk fields', () => {
    const screen = renderWithProvider(<EditTalk {...editTalkProps} />);

    const titleField = screen.getByRole('textbox', { name: 'title' });
    expect(titleField).toBeRequired();

    const utcDateStringISOField = screen.getByRole('textbox', { name: 'date' });
    expect(utcDateStringISOField).toBeRequired();

    const descriptionField = screen.getByRole('textbox', { name: 'description' });
    expect(descriptionField).toBeRequired();

    const slidesFilenameField = screen.getByRole('textbox', { name: 'slide-filename' });
    expect(slidesFilenameField).toBeRequired();

    const conferenceNameField = screen.getByRole('textbox', { name: 'conference-name' });
    expect(conferenceNameField).toBeRequired();

    const conferenceImageNameField = screen.getByRole('textbox', { name: 'conference-image-name' });
    expect(conferenceImageNameField).toBeRequired();

    const conferenceLinkField = screen.getByRole('textbox', { name: 'conference-link' });
    expect(conferenceLinkField).toBeRequired();

    const recordingLinkField = screen.getByRole('textbox', { name: 'recording-link' });
    expect(recordingLinkField).toBeRequired();
  });

  test('renders update button', () => {
    const screen = renderWithProvider(<EditTalk {...editTalkProps} />);
    const updateButton = screen.getByRole('button', { name: /update talk \d+/i });
    expect(updateButton).toBeInTheDocument();
  });

  test('renders delete button', () => {
    const screen = renderWithProvider(<EditTalk {...editTalkProps} />);
    const deleteButton = screen.getByRole('button', { name: /delete talk \d+/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
