import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import React, { ReactElement, ReactFragment } from 'react';
import { Link } from 'react-router-dom';

interface NavMenuProps {
  breakpointClass: string;
  homeButton: ReactFragment;
  tabList: string[];
}

export default function NavMenu({
  breakpointClass,
  homeButton,
  tabList,
}: NavMenuProps): ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span className={breakpointClass}>
      {homeButton}
      <IconButton
        aria-label="tabs menu"
        aria-controls="tabs-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        edge="end"
        color="secondary"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Menu
        id="tabs-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {tabList.map((tabName) => (
          <MenuItem
            key={tabName}
            onClick={handleClose}
            component={Link}
            to={`/${tabName}`}
          >
            {tabName}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
}
