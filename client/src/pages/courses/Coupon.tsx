import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment-timezone';
import React, { ReactElement } from 'react';

import { CouponType } from '../../types';

type CouponProps = {
  couponData: CouponType,
  courseLink: string
};

// eslint-disable-next-line max-lines-per-function
export default function Coupon({ courseLink, couponData }: CouponProps): ReactElement {
  const couponLink = `${courseLink}?couponCode=${couponData.code}`;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const expirationString = moment(couponData.utcExpiration).tz(tz).format('MMM DD ha z');

  return (
    <Box display="flex">
      <Box p={1} flex="auto">
        <Button target="_blank" href={couponLink} rel="noreferrer" color="secondary">
          <Typography
            variant="button"
            display="block"
            gutterBottom
          >
            {`Coupon for $${couponData.price}`}
          </Typography>
        </Button>
      </Box>
      <Box p={2} flex="auto">
        <Typography role="note" variant="body2" display="block" color="textSecondary">
          <strong>EXPIRES</strong>
          {' '}
          {expirationString}
        </Typography>
      </Box>
    </Box>
  );
}
