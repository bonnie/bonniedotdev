import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { colors } from 'Theme';

import { TalkType } from './Types';

interface TalkProps {
  talkData: TalkType,
  editButtons: ReactElement | null,
}

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: 1000,
    margin: 20,
  },
  confLink: {
    marginRight: 5,
  },
  title: {
    color: colors.darkGrey,
    marginTop: 8,
    marginBottom: 8,
    marginRight: 8,
  },
}));

const ConditionalDisplayLink = ({ text, link, condition }) => (condition
  ? (
    <Button variant="text">
      <Link style={{ color: colors.mediumTeal }} href={link}>{text}</Link>
    </Button>
  )
  : null);

// eslint-disable-next-line max-lines-per-function
export default function Talk({ talkData, editButtons }: TalkProps): ReactElement {
  const classes = useStyles();

  return (
    <Card role="listitem" className={classes.root}>
      <CardContent>
        <Box>
          <Typography variant="body1" gutterBottom style={{ display: 'inline', marginRight: 10 }}>
            {moment(talkData.utcDateStringISO).format('MMMM DD YYYY')}
          </Typography>
          <Link color="secondary" className={classes.confLink} href={talkData.conferenceLink} target="_blank" rel="noreferrer">
            {talkData.conferenceName}
          </Link>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" className={classes.title} style={{ display: 'inline' }}>
            {talkData.title}
          </Typography>
          {editButtons}
        </Box>
        <Divider variant="middle" />
        <Typography variant="body1">{talkData.description}</Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <ConditionalDisplayLink text="Slides" link={`/static/images/slides/${talkData.slidesFilename}`} condition={talkData.slidesFilename} />
          <ConditionalDisplayLink text="Recording" link={talkData.recordingLink} condition={talkData.recordingLink} />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
