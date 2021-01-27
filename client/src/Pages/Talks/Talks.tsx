/* eslint-disable sonarjs/cognitive-complexity */
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, {
  ReactElement, useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTalkButton from './AddTalkButton';
import DeleteTalkButton from './DeleteTalkButton';
import EditTalkButton from './EditTalkButton';
import { setTalksFromServer } from './Redux/Actions';
import Talk from './Talk';
import { TalkType } from './Types';

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
  const user = useSelector((state) => state.user);
  const { past, upcoming } = useSelector((state) => state.talks);

  // load talks from server on component mount
  useEffect(() => { dispatch(setTalksFromServer()); }, [dispatch]);

  function createWholeRowCell(content) {
    return (
      <TableRow>
        <TableCell colSpan={columnNames.length} align="left">
          {content}
        </TableCell>
      </TableRow>
    );
  }

  const mapTalkToElement = useCallback((talkData: TalkType) => {
    if (!talkData.id) return null;

    const editButtons = (
      <>
        <EditTalkButton id={talkData.id} talkData={talkData} />
        <DeleteTalkButton id={talkData.id} name={talkData.title} />
      </>
    );

    return (
      <Talk
        key={talkData.id}
        talkData={talkData}
        editButtons={user ? editButtons : null}
      />
    );
  }, [user]);

  const contents = useMemo(() => (
    <>
      <span>
        <Typography style={{ display: 'inline', marginRight: 10 }} variant="h1" gutterBottom>
          Talks
        </Typography>
        { user ? <AddTalkButton /> : null }
      </span>
      <Table aria-label="talks">
        <TableHead>
          <TableRow>
            {columnNames.map((columnName) => <TableCell key={columnName} align="center">{columnName}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {createWholeRowCell(<Typography variant="h2">Upcoming</Typography>)}
          { upcoming.length > 0
            ? upcoming.map(mapTalkToElement)
            : createWholeRowCell('No upcoming talks scheduled. Check back later!')}
          {createWholeRowCell(<Typography variant="h2">Past</Typography>)}
          {past.map(mapTalkToElement)}
        </TableBody>
      </Table>
    </>
  ), [past, upcoming, user, mapTalkToElement]);

  return user
    ? <MuiPickersUtilsProvider utils={DateFnsUtils}>{contents}</MuiPickersUtilsProvider>
    : contents;
}
