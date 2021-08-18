import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { useOnlineUsersQuery, OnlineUser } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { openOnlineUSersModalVar } from '../../lib/apolloVars';
import Modal from '../Modal/Modal';
import OnlineUsersList from './OnlineUsersList';

const OnlineUsersModal = () => {
  const { roomData } = useRoomData();
  const openModal = useReactiveVar(openOnlineUSersModalVar);

  const { data: usersData } = useOnlineUsersQuery({
    variables: {
      roomId: roomData.room.id,
    },
    pollInterval: 15000,
  });

  const handleClose = () => {
    openOnlineUSersModalVar(false);
  };

  return (
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
  );
};

export default OnlineUsersModal;
