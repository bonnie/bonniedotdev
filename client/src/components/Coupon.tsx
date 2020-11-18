import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CouponType } from '../types';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type CouponProps = {
  data: CouponType,
};

export default function Coupon({ data }: CouponProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {data.price}
        </Typography>
        <Typography variant="h5" component="h2">
          {'code: {data.code}'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {'expires: {data.utcExpiration}'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Redeem Coupon</Button>
      </CardActions>
    </Card>
  );
}
