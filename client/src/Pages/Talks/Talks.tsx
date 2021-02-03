/* eslint-disable sonarjs/cognitive-complexity */
import DateFnsUtils from '@date-io/date-fns';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddTalkButton from './AddTalkButton';
import DeleteTalkButton from './DeleteTalkButton';
import EditTalkButton from './EditTalkButton';
import { setTalksFromServer } from './Redux/Actions';
import Talk from './Talk';
import { TalkType } from './Types';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: 'inline',
      marginRight: 10,
    },
  }),
);

// small functional component for "no upcoming talks" card
function NoUpcomingTalks(): ReactElement {
  return (
    <Card style={{ maxWidth: 1000, margin: 20 }}>
      <Typography variant="body1" style={{ margin: 10 }}>
        No upcoming talks scheduled. Check back later!
      </Typography>
    </Card>
  );
}

// eslint-disable-next-line max-lines-per-function
export default function Talks(): ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { past, upcoming } = useSelector((state) => state.talks);

  // load talks from server on component mount
  useEffect(() => {
    dispatch(setTalksFromServer());
  }, [dispatch]);

  const mapTalkToElement = useCallback(
    (talkData: TalkType) => {
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
    },
    [user],
  );

  const contents = useMemo(
    () => (
      <>
        <PageTitleWithAdd
          title="Conference Talks and Workshops"
          variant="h1"
          AddButton={<AddTalkButton />}
        />
        <Grid style={{ marginTop: 10 }} aria-label="talks">
          <Typography className={classes.header} variant="h2" gutterBottom>
            Upcoming
          </Typography>
          <section role="list" title="upcoming-talks-list">
            {upcoming.length > 0 ? (
              upcoming.map(mapTalkToElement)
            ) : (
              <NoUpcomingTalks />
            )}
          </section>
          <Typography className={classes.header} variant="h2" gutterBottom>
            Past
          </Typography>
          <section role="list" title="past-talks-list">
            {past.map(mapTalkToElement)}
          </section>
        </Grid>
      </>
    ),
    [past, upcoming, mapTalkToElement, classes.header],
  );

  return user ? (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {contents}
    </MuiPickersUtilsProvider>
  ) : (
    contents
  );
}
