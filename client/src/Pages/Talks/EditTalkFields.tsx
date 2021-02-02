/* eslint-disable max-lines-per-function */
import DateInput from 'Pages/Common/Inputs/DateInput';
import ImageNameInput from 'Pages/Common/Inputs/ImageNameInput';
import LinkInput from 'Pages/Common/Inputs/LinkInput';
import TextInput from 'Pages/Common/Inputs/TextInput';
import React, { ReactElement, useState } from 'react';

import { NewTalkType, TalkType } from './Types';

const newTalk: NewTalkType = {
  title: '',
  utcDateStringISO: '',
  description: '',
  slidesFilename: '',
  conferenceName: '',
  conferenceLink: '',
  recordingLink: '',
};

interface EditTalkFieldsType {
  talkData?: TalkType | NewTalkType;
}

EditTalkFields.defaultProps = { talkData: newTalk };

export default function EditTalkFields({
  talkData = newTalk,
}: EditTalkFieldsType): ReactElement {
  // adding time is necessary, otherwise it gets translated funny and shows up as the day before
  const [talkDate, setTalkDate] = useState(
    `${talkData.utcDateStringISO} 00:00:00`,
  );

  // TODO: add server endpoint for available slide files / conference images
  return (
    <>
      <TextInput required fieldName="title" defaultValue={talkData.title} />
      <DateInput
        fieldName="utcDateStringISO"
        value={talkDate}
        label="change date"
        dateSetter={setTalkDate}
      />
      <TextInput
        required
        fieldName="description"
        defaultValue={talkData.description}
      />
      <ImageNameInput
        required={false}
        fieldName="slidesFilename"
        defaultValue={talkData.slidesFilename || ''}
      />
      <TextInput
        required
        fieldName="conferenceName"
        defaultValue={talkData.conferenceName}
      />
      <LinkInput
        required
        fieldName="conferenceLink"
        defaultValue={talkData.conferenceLink}
      />
      <LinkInput
        required={false}
        fieldName="recordingLink"
        defaultValue={talkData.recordingLink || ''}
      />
    </>
  );
}
