import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import dayjs from 'dayjs';
import React from 'react';
import { useOnlineUsersQuery, useUserQuery } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { UserModalProps } from '../../types/userModal';
import Modal from '../Modal/Modal';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import useUserModalStyles from './UserModalStyles';
import UserModalActions from './UsertMoalActions';

const UserModal = ({
  id,
  openModal,
  handleClose,
}: UserModalProps) => {
  const { roomData } = useRoomData();
  const classes = useUserModalStyles();
  const { data } = useUserQuery({
    variables: {
      id,
    },
  });

  const { data: usersData } = useOnlineUsersQuery({
    variables: {
      roomId: roomData.room.id,
    },
    pollInterval: 10000,
  });

  const isOnline = usersData?.onlineUsers.some(
    (user) => user.name === data?.user.displayName
  );

  return (
    <Modal open={openModal} close={handleClose}>
      {data ? (
        <Box className={classes.wrapper}>
          <AvatarPhoto
            className={classes.avatar}
            src={data.user.photo}
            name={data.user.displayName}
            styles={{ border: `3px solid ${data.user.color}` }}
            color={data.user.color}
          />
          <Box className={classes.name}>
            {isOnline && <Box className={classes.online}></Box>}
            <Typography variant="subtitle1">{data.user.displayName}</Typography>
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            Użytkownik od: {dayjs(data.user.createdAt).format('DD.MM.YYYY')}
          </Typography>
          <UserModalActions id={id} />
        </Box>
      ) : (
        <Box className={classes.wrapper}>
          <Skeleton
            style={{ marginBottom: 10 }}
            variant="circle"
            width={40}
            height={40}
          />
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={200} />
        </Box>
      )}
    </Modal>
  );
};

export default UserModal;
