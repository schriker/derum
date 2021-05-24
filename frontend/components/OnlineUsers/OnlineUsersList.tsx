import { Box } from '@material-ui/core';
import React from 'react';
import { OnlineUser } from '../../generated/graphql';
import { OnlineUsersListProps } from '../../types/onlineUsers';
import { CustomInput } from '../CustomInput/CustomInput';
import SearchIcon from '../Icons/SearchIcon';
import OnlineUsersSection from './OnlineUsersSection';
import useOnlineUsersStyles from './OnlineUsersStyle';

const OnlineUsersList = ({ users }: OnlineUsersListProps) => {
  const classes = useOnlineUsersStyles();
  const onlineAdmins: OnlineUser[] = [];
  const onlineUsers: OnlineUser[] = [];

  users.forEach((user) => {
    if (user.isAdmin || user.isModerator) {
      onlineAdmins.push(user);
    } else {
      onlineUsers.push(user);
    }
  });

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.inputWrapper}>
        <CustomInput
          startAdornment={<SearchIcon className={classes.icon} />}
          className={classes.search}
          placeholder="Szukaj użytkownika"
        />
      </Box>
      <OnlineUsersSection title="Administratorzy" data={onlineAdmins} />
    </Box>
  );
};

export default OnlineUsersList;
