import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { OnlineUser } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { OnlineUsersListProps } from '../../types/onlineUsers';
import SearchInput from '../SearchInput/SearchInput';
import UserModal from '../UserModal/UserModal';
import OnlineUsersSection from './OnlineUsersSection';
import useOnlineUsersStyles from './OnlineUsersStyle';

const OnlineUsersList = ({ users }: OnlineUsersListProps): JSX.Element => {
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const [userId, setUserId] = useState(null);
  const classes = useOnlineUsersStyles();
  const [searchValue, setSearchValue] = useState('');
  const onlineAdmins: OnlineUser[] = [];
  const onlineUsers: OnlineUser[] = [];

  users
    .filter((user) =>
      user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    .forEach((user) => {
      if (user.isAdmin || user.isModerator) return onlineAdmins.push(user);

      onlineUsers.push(user);
    });

  const handlerUserSelect = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.inputWrapper}>
        <SearchInput
          style={{
            marginBottom: 10,
          }}
          value={searchValue}
          onChange={handleChange}
          placeholder="Szukaj użytkownika"
        />
      </Box>
      <OnlineUsersSection
        handleUserClick={handlerUserSelect}
        title="Administratorzy"
        data={onlineAdmins}
      />
      <OnlineUsersSection
        handleUserClick={handlerUserSelect}
        title="Użytkownicy"
        data={onlineUsers}
      />
      {userId && (
        <UserModal
          openModal={openModal}
          handleClose={handleClose}
          id={userId}
        />
      )}
    </Box>
  );
};

export default OnlineUsersList;
