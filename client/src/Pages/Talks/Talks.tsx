/* eslint-disable sonarjs/cognitive-complexity */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { hasNewItem } from 'Helpers';
import moment from 'moment';
import AddButton from 'Pages/Common/AddButton';
import React, {
  ReactElement, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditTalk from './EditTalk';
import ReadOnlyTalk from './ReadOnlyTalk';
import { setTalks, setTalksFromServer } from './Redux/Actions';
import { TalkRangeType, TalkType } from './Types';

const columnNames = [
  'Date',
  'Conference',
  'Title',
  'Description',
  'Links',
];

// eslint-disable-next-line max-lines-per-function
export default function Talks(): ReactElement {
  const dispatch = useDispatch();
  const talks = useSelector((state) => state.talks);
  const user = useSelector((state) => state.user);

  // TODO: unify this code so it's shared with Courses.tsx etc rather than repeated
  // only allow one new quote at a time, since submitting a new quote will obliterate
  // any other quotes-in-progress
  const [addButton, setAddButton] = useState(user !== null);
  useEffect(
    () => { if (user) setAddButton(!hasNewItem(talks)); },
    [user, talks],
  );

  // populate review quotes data from the server
  useEffect(() => { dispatch(setTalksFromServer()); }, [dispatch]);

  // wrap in useCallback to keep from regenerating needlessly
  const addTalk = useCallback(() => {
    const newTalk: TalkType = {
      title: '',
      utcDateStringISO: '',
      description: '',
      slidesFilename: '',
      conferenceImageName: '',
      conferenceName: '',
      conferenceLink: '',
      recordingLink: '',
      id: 0 - (talks.length + 1),
    };
    dispatch(setTalks([...talks, newTalk]));
  }, [talks, dispatch]);

  const deleteTalk = useCallback((id) => {
    const newTalks = talks.filter((talk) => talk.id !== id);
    dispatch(setTalks(newTalks));
  }, [talks, dispatch]);

  const mapTalkToElement = useMemo(() => (user
    ? (talkRange, talk, index) => (
      <EditTalk
        key={talk.id}
        talkData={talk}
        deleteTalkFromState={deleteTalk}
        createWholeRowCell={createWholeRowCell}
        talkIndex={index}
        talkRange={talkRange}
      />
    )
    : (talkRange, talk) => (
      <ReadOnlyTalk
        key={talk.id}
        talkData={talk}
        talkRange={talkRange}
      />
    )), [user, deleteTalk]);

  function createWholeRowCell(content) {
    return (
      <TableRow>
        <TableCell colSpan={columnNames.length} align="left">
          {content}
        </TableCell>
      </TableRow>
    );
  }

  // separate talks into past and future, and sort
  const today = moment(new Date()).toISOString();
  const upcomingTalks = talks
    .filter((talk) => talk.utcDateStringISO >= today)
    .sort((a, b) => b.utcDateStringISO - a.utcDateStringISO);
  const pastTalks = talks
    .filter((talk) => talk.utcDateStringISO < today)
    .sort((a, b) => b.utcDateStringISO - a.utcDateStringISO);

  return useMemo(() => (
    <>
      <Typography variant="h1" gutterBottom>
        Talks
      </Typography>
      <Table aria-label="talks">
        <TableHead>
          <TableRow>
            {columnNames.map((columnName) => <TableCell key={columnName} align="center">{columnName}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {createWholeRowCell(<Typography variant="h2">Upcoming</Typography>)}
          {addButton ? createWholeRowCell(<AddButton onClick={addTalk} itemString="Talk" />) : null }
          {upcomingTalks.map((data, index) => mapTalkToElement('upcoming', data, index))}
          {createWholeRowCell(<Typography variant="h2">Past</Typography>)}
          {pastTalks.map((data, index) => mapTalkToElement('past', data, index))}
        </TableBody>
      </Table>
    </>
  ), [addButton, addTalk, mapTalkToElement, pastTalks, upcomingTalks]);
}
