/* eslint-disable sonarjs/cognitive-complexity */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

import AddTalkButton from './AddTalkButton';
import DeleteTalkButton from './DeleteTalkButton';
import EditTalkButton from './EditTalkButton';
import Talk from './Talk';
import { TalkType } from './Types';

const columnNames = [
  'Date',
  'Conference',
  'Title',
  // 'Description',
  'Links',
];

const mapTalkToElement = (talkData: TalkType) => {
  if (!talkData.id) return null;

  const editButtons = (
    <>
      <EditTalkButton id={talkData.id} />
      <DeleteTalkButton id={talkData.id} name={talkData.title} />
    </>
  );

  return (
    <Talk
      key={talkData.id}
      talkData={talkData}
      editButtons={editButtons}
    />
  );
};

// eslint-disable-next-line max-lines-per-function
export default function Talks(): ReactElement {
  const { past, upcoming } = useSelector((state) => state.talks);
  const user = useSelector((state) => state.user);

  function createWholeRowCell(content) {
    return (
      <TableRow>
        <TableCell colSpan={columnNames.length} align="left">
          {content}
        </TableCell>
      </TableRow>
    );
  }

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
          { user ? createWholeRowCell(<AddTalkButton />) : null }
          { upcoming.length > 0
            ? upcoming.map(mapTalkToElement)
            : createWholeRowCell('No upcoming talks scheduled. Check back later!')}
          {createWholeRowCell(<Typography variant="h2">Past</Typography>)}
          {past.map(mapTalkToElement)}
        </TableBody>
      </Table>
    </>
  ), [past, upcoming, user]);
}
