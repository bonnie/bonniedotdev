/* eslint-disable max-lines-per-function */
import DateFnsUtils from '@date-io/date-fns';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getFormData } from 'Helpers';
import moment from 'moment';
import EditButtons from 'Pages/Common/EditButtons';
import React, {
  ReactElement, useCallback, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';

import { addTalk, deleteTalk, editTalk } from './Redux/Actions';
import { TalkRangeType, TalkType } from './Types';

interface EditTalkProps {
  talkData: TalkType,
  talkIndex: number,
  createWholeRowCell: (element: ReactElement) => ReactElement,
  deleteTalkFromState: (number) => void,
  talkRange: TalkRangeType
}

export default function EditTalk(
  {
    talkData, talkIndex, createWholeRowCell, deleteTalkFromState, talkRange,
  }: EditTalkProps,
): ReactElement {
  const dispatch = useDispatch();
  const notSaved = talkData.id < 1;
  const [talkDate, setTalkDate] = useState(talkData.utcDateStringISO);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = getFormData(event);
    dispatch(notSaved ? addTalk(formData) : editTalk(formData, talkData));
  }, [dispatch, notSaved, talkData]);

  const handleDelete = useCallback(() => {
    if (notSaved) {
      deleteTalkFromState(talkData.id);
    } else {
      // it's got to be deleted from the db
      dispatch(deleteTalk(talkData.id));
    }
  }, [notSaved, talkData, deleteTalkFromState, dispatch]);

  const itemLabel = `${talkRange} Talk ${talkIndex}`;
  const itemId = `talk-${talkRange}-${talkIndex}`;

  const fieldNames = [
    'title',
    'date',
    'description',
    'slide-link',
    'conference-image-name',
    'conference-link',
    'recording-link',
  ];

  const fields = fieldNames.map((fieldName) => {
    if (fieldName === 'date') {
      return (
        <DatePicker
          key="date"
          required
          aria-label={`${itemLabel} date`}
          value={talkDate}
          onChange={(value) => (setTalkDate(moment(value).toString()))}
          label="Talk date"
          format="MMM dd Y, H:mm"
          style={{ width: '100%' }}
        />
      );
    }
    return (
      <TextField
        key={fieldName}
        required
        multiline
        name={fieldName}
        id={`${itemId}-${fieldName}`}
        aria-label={`${itemLabel} ${fieldName}`}
        label={fieldName}
        style={{ width: '100%' }}
        defaultValue={talkData[fieldName] || ''}
      />
    );
  });

  const contents = useMemo(() => (
    <form aria-label={itemLabel} onSubmit={handleSubmit}>
      <Input type="hidden" id={`${itemId}-id`} name="id" value={talkData.id} />
      {fields}
      <EditButtons
        handleDelete={handleDelete}
        itemString="Talk"
        itemLabel={itemLabel}
      />
    </form>
  ), [handleDelete, handleSubmit, itemId, itemLabel, talkData, fields]);

  return createWholeRowCell(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {contents}
    </MuiPickersUtilsProvider>,
  );
}
