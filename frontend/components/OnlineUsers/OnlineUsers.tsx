import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { indexRoomVars } from '../../consts';
import {
  OnlineUser,
  useOnlineUsersQuery,
  useRoomQuery,
} from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import UserIcon from '../Icons/UserIcon';
import Modal from '../Modal/Modal';
import DarkTooltip from '../Tooltip/Tooltip';
import OnlineUsersList from './OnlineUsersList';

const OnlineUsers = () => {
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();

  const { data: roomData } = useRoomQuery({
    variables: {
      name: indexRoomVars.name,
    },
  });

  const { data: usersData } = useOnlineUsersQuery({
    variables: {
      roomId: roomData.room.id,
    },
    pollInterval: 10000,
  });

  return (
    <Box mx="5px">
      <DarkTooltip title="Użytkownicy online" enterDelay={500}>
        <ButtonIcon onClick={handleOpen} color="secondary">
          <UserIcon style={{ fontSize: 18 }} />
        </ButtonIcon>
      </DarkTooltip>
      <Modal
        title={`Użytkownicy online: ${
          usersData ? usersData.onlineUsers.length : 0
        }`}
        fullWidth
        maxWidth="xs"
        open={openModal}
        close={handleClose}
      >
        {usersData && (
          <OnlineUsersList users={usersData.onlineUsers as OnlineUser[]} />
        )}
      </Modal>
    </Box>
  );
};

export default OnlineUsers;
