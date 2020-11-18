import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { CouponType } from '../types';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

type CouponProps = {
  couponData: CouponType,
  courseLink: string
};

export default function CouponButton({ courseLink, couponData }: CouponProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => { setAnchorEl(event.currentTarget); };
  const handlePopoverClose = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);

  const couponLink = `${courseLink}?couponCode=${couponData.code}`;

  return (
    <Button target="_blank" href={couponLink} rel="noreferrer">
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="button"
        display="block"
        gutterBottom
      >
        {`$${couponData.price}`}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{`expires at ${couponData.utcExpiration}`}</Typography>
      </Popover>
    </Button>
  );
}
