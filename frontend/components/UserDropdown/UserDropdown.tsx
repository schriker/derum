import { Box, ListItemText, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import Dropdown from '../Dropdown/Dropdown';
import DropdownIcon from '../Dropdown/DropdownIcon';
import DropdownItem from '../Dropdown/DropdownItem';
import BugIcon from '../Icons/BugIcon';
import HelpIcon from '../Icons/HelpIcon';
import LogoutIcon from '../Icons/LogoutIcon';
import MessageIcon from '../Icons/MessageIcon';
import SunIcon from '../Icons/SunIcon';
import UserIcon from '../Icons/UserIcon';
import UserButton from '../UserButton/UserButton';

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    fontSize: 16,
    color: theme.palette.grey[600],
  },
}));

const UserDropdown = () => {
  const classes = useStyles();
  const [logout] = useLogoutMutation({
    onError: () => {
      globalErrorVar({ isOpen: true, message: 'Błąd serwera!' });
    },
    update(cache, { data: { logout } }) {
      if (logout) {
        cache.reset();
      }
    },
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const items = [
    {
      text: 'Profil',
      icon: <UserIcon className={classes.icon} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Wiadomości',
      icon: <MessageIcon className={classes.icon} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Tryb dzienny',
      icon: <SunIcon className={classes.icon} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Zgłoś błąd',
      icon: <BugIcon className={classes.icon} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Pomoc',
      icon: <HelpIcon className={classes.icon} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Wyloguj',
      icon: <LogoutIcon className={classes.icon} />,
      onClick: () => logout(),
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box mr={2}>
      <UserButton onClick={handleClick} />
      <Dropdown
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item) => (
          <DropdownItem onClick={item.onClick} key={item.text}>
            <DropdownIcon>{item.icon}</DropdownIcon>
            <ListItemText primary={item.text} />
          </DropdownItem>
        ))}
      </Dropdown>
    </Box>
  );
};

export default UserDropdown;
