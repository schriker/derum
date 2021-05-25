import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import dayjs from 'dayjs';
import React from 'react';
import { indexRoomVars } from '../../consts';
import {
  useMeQuery,
  useOnlineUsersQuery,
  useRoomQuery,
  useUserQuery,
} from '../../generated/graphql';
import { UserModalProps } from '../../types/userModal';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import LockIcon from '../Icons/LockIcon';
import MessageIcon from '../Icons/MessageIcon';
import Modal from '../Modal/Modal';
import UserAvatar from '../UserAvatar/UserAvatar';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    marginBottom: 10,
  },
  online: {
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    marginRight: 6,
    marginTop: 3,
    marginLeft: -14,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  buttons: {
    marginTop: 20,
    '& > :first-child': {
      marginRight: 10,
    },
  },
}));

const UserModal = ({ id, openModal, handleClose }: UserModalProps) => {
  const classes = useStyles();
  const { data } = useUserQuery({
    variables: {
      id,
    },
  });

  const { data: me } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

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

  const isOnline = usersData?.onlineUsers.some(
    (user) => user.name === data?.user.displayName
  );

  return (
    <Modal open={openModal} close={handleClose}>
      {data ? (
        <Box className={classes.wrapper}>
          <UserAvatar
            className={classes.avatar}
            src={data.user.photo}
            name={data.user.displayName}
            styles={{ border: '3px solid #FF026A' }}
          />
          <Box className={classes.name}>
            {isOnline && <Box className={classes.online}></Box>}
            <Typography variant="subtitle1">{data.user.displayName}</Typography>
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            Użytkownik od: {dayjs(data.user.createdAt).format('DD.MM.YYYY')}
          </Typography>
          {me && (
            <Box className={classes.buttons}>
              <ButtonPrimary color="primary" endIcon={<MessageIcon />}>
                Wiadomość
              </ButtonPrimary>
              <ButtonPrimary color="secondary" endIcon={<LockIcon />}>
                Zablokuj
              </ButtonPrimary>
            </Box>
          )}
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
