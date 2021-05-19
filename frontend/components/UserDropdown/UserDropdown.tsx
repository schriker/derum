import { Box, ListItemText } from '@material-ui/core';
import React from 'react';
import { MeDocument, useLogoutMutation } from '../../generated/graphql';
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

const UserDropdown = () => {
  const [logout] = useLogoutMutation({
    update(cache, { data: { logout } }) {
      if (logout) {
        cache.modify({
          fields: {
            me(_, { DELETE }) {
              return DELETE;
            },
          },
        });
      }
    },
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const items = [
    {
      text: 'Profil',
      icon: <UserIcon style={{ fontSize: 16 }} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Wiadomości',
      icon: <MessageIcon style={{ fontSize: 18 }} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Tryb dzienny',
      icon: <SunIcon style={{ fontSize: 18 }} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Zgłoś błąd',
      icon: <BugIcon style={{ fontSize: 18 }} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Pomoc',
      icon: <HelpIcon style={{ fontSize: 18 }} />,
      onClick: () => console.log('Click'),
    },
    {
      text: 'Wyloguj',
      icon: <LogoutIcon style={{ fontSize: 18 }} />,
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
