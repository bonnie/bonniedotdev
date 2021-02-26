/* eslint-disable sonarjs/cognitive-complexity */
import DateFnsUtils from '@date-io/date-fns';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { talkDetails } from 'Constants/itemConstants';
import useTalks from 'Hooks/GetData/useTalks';
import useSelector from 'Hooks/useTypedSelector';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Talk as TalkType } from 'Types';

import EditTalkFields from './EditTalkFields';
import Talk from './Talk';

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
  const user = useSelector((state) => state.user);

  // load talks from server on component mount
  const { past, upcoming } = useTalks();

  const mapTalkToElement = useCallback(
    (talkData: TalkType) => <Talk key={talkData.id} talkData={talkData} />,
    [],
  );

  const contents = useMemo(
    () => (
      <>
        <Helmet>
          <title>Bonnie Schulkin | Talks</title>
          <meta name="description" content="Past and upcoming talks" />
        </Helmet>
        <PageTitleWithAdd
          title="Conference Talks and Workshops"
          itemDetails={talkDetails}
          ItemFieldsComponent={<EditTalkFields />}
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
