import Popover from '@material-ui/core/Popover';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

interface IconLinkProps {
  link: string;
  iconComponent: ReactElement;
  altText: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

// eslint-disable-next-line max-lines-per-function
export default function IconLink({
  link,
  iconComponent,
  altText,
}: IconLinkProps): ReactElement | null {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return link ? (
    <a
      aria-label={altText}
      aria-owns={open ? 'mouse-over-popover' : undefined}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      target="_blank"
      rel="noreferrer"
      href={link}
    >
      {iconComponent}
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{altText}</Typography>
      </Popover>
    </a>
  ) : null;
}
