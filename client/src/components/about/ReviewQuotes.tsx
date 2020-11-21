import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { ReactElement } from 'react';

import { ReviewQuoteType } from '../../types';

type ReviewQuotesProps = {
  reviewQuotesData: ReviewQuoteType[],
};

// eslint-disable-next-line max-lines-per-function
export default function ReviewQuotes({ reviewQuotesData }: ReviewQuotesProps): ReactElement {
  const useStyles = makeStyles((theme: Theme) => createStyles({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardActions disableSpacing>
        <Typography>Students are saying...</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show review quotes"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {reviewQuotesData?.map(
            (reviewQuote) => (
              <Typography key={reviewQuote.id} paragraph>{reviewQuote.reviewQuote}</Typography>
            ),
          )}
        </CardContent>
      </Collapse>
    </>
  );
}
