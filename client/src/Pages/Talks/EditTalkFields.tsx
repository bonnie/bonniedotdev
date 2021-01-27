/* eslint-disable max-lines-per-function */
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import React, { ReactElement, useState } from 'react';

import { TalkType } from './Types';

const newTalk: TalkType = {
  id: null,
  title: '',
  utcDateStringISO: '',
  description: '',
  slidesFilename: '',
  conferenceImageName: '',
  conferenceName: '',
  conferenceLink: '',
  recordingLink: '',
};

interface EditTalkFieldsType {
  talkData?: TalkType,
}

EditTalkFields.defaultProps = { talkData: newTalk };

export default function EditTalkFields({ talkData = newTalk }: EditTalkFieldsType): ReactElement {
  // adding time is necessary, otherwise it gets translated funny and shows up as the day before
  const [talkDate, setTalkDate] = useState(`${talkData.utcDateStringISO} 00:00:00`);

  // const setTalkDateOnly = (dateValue) => setTalkDate(moment(dateValue, 'YYYY-MM-DD').toString());

  const fieldNames = [
    'title',
    'utcDateStringISO',
    'description',
    'slidesFilename',
    'conferenceImageName',
    'conferenceName',
    'conferenceLink',
    'recordingLink',
  ];

  const optionalFields = [
    'slidesFilename',
    'recordingLink',
  ];

  const fields = fieldNames.map((fieldName) => {
    if (fieldName === 'utcDateStringISO') {
      // fancy date picker for date
      return (
        <KeyboardDatePicker
          key={fieldName}
          name={fieldName}
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id="date-picker-inline"
          value={talkDate}
          onChange={setTalkDate}
          KeyboardButtonProps={{ 'aria-label': 'change date' }}
        />
      );
    }
    // otherwise just a text box
    return (
      <TextField
        required={!optionalFields.includes(fieldName)}
        key={fieldName}
        multiline
        name={fieldName}
        id={fieldName}
        aria-label={fieldName}
        label={fieldName}
        style={{ width: '100%' }}
        defaultValue={talkData[fieldName] || ''}
      />
    );
  });
  return <>{fields}</>;
}
