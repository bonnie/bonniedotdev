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
  const [talkDate, setTalkDate] = useState(talkData.utcDateStringISO);

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

  const fields = fieldNames.map((fieldName) => {
    if (fieldName === 'utcDateStringISO') {
      // fancy date picker for date
      return (
        <KeyboardDatePicker
          key={fieldName}
          name={fieldName}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={talkDate}
          onChange={(value) => setTalkDate(moment(value).toISOString())}
          KeyboardButtonProps={{ 'aria-label': 'change date' }}
        />
      );
    }
    // otherwise just a text box
    return (
      <TextField
        key={fieldName}
        multiline
        name={fieldName}
        id={fieldName}
        aria-label={fieldName}
        label={fieldName}
        style={{ width: '100%' }}
        defaultValue={talkData[fieldName] ?? ''}
      />
    );
  });
  return <>{fields}</>;
}
