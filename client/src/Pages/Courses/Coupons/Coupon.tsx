/* eslint-disable react/jsx-one-expression-per-line */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import React, { ReactElement } from 'react';

import { CouponType } from './Types';

type CouponProps = {
  couponData: CouponType;
};

// eslint-disable-next-line max-lines-per-function
export default function Coupon({ couponData }: CouponProps): ReactElement {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const expirationString = moment(couponData.utcExpirationISO)
    .tz(tz)
    .format('MMM DD ha z');

  return (
    <Box display="flex" alignItems="center">
      <Box p={1} flex="auto">
        <Button
          target="_blank"
          href={couponData.link}
          rel="noreferrer"
          color="inherit"
        >
          <Typography variant="button" display="block" gutterBottom>
            Coupon for
            <span style={{ color: '#a00', fontSize: '125%' }}>
              &nbsp;$
              {couponData.price}
            </span>
          </Typography>
        </Button>
      </Box>
      <Box p={2} flex="auto">
        <Typography
          role="note"
          variant="body2"
          display="block"
          color="textSecondary"
        >
          <strong>EXPIRES</strong> {expirationString}
        </Typography>
      </Box>
    </Box>
  );
}
