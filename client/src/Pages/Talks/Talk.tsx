import Link from '@material-ui/core/Link';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DvrIcon from '@material-ui/icons/Dvr';
import VideocamIcon from '@material-ui/icons/Videocam';
import IconLink from 'Pages/Common/IconLink';
import React, { ReactElement } from 'react';

import { TalkType } from './Types';

interface TalkProps {
  talkData: TalkType,
  editButtons: ReactElement | null,
}

export default function Talk({ talkData, editButtons }: TalkProps): ReactElement {
  const slideLink = talkData.slidesFilename
    ? (
      <IconLink
        link={`/static/images/slides/${talkData.slidesFilename}`}
        iconComponent={<DvrIcon />}
        altText="slides"
      />
    )
    : null;

  const recordingLink = talkData.recordingLink
    ? (
      <IconLink
        link={talkData.recordingLink}
        iconComponent={<VideocamIcon />}
        altText="recording"
      />
    )
    : null;

  return (
    <TableRow>
      <TableCell>
        {editButtons}
        {talkData.utcDateStringISO}
      </TableCell>
      <TableCell align="center">
        <Link href={talkData.conferenceLink}>
          <img
            src={`/static/images/conference-logos/${talkData.conferenceImageName}`}
            alt={talkData.conferenceName}
            style={{ maxWidth: '150px', maxHeight: '50px' }}
          />
        </Link>
      </TableCell>
      <TableCell align="center">{talkData.title}</TableCell>
      <TableCell style={{ width: '40%' }}>{talkData.description}</TableCell>
      <TableCell align="center">
        { slideLink }
        {recordingLink}
      </TableCell>
    </TableRow>
  );
}
