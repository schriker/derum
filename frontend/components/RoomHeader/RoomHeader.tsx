import React from 'react';
import useHeaderStyles from './RoomHeaderStyles';
import useRoomData from '../../hooks/useRoomData';
import { Box, Typography } from '@material-ui/core';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import RoomHeaderJoinButton from './RoomHeaderJoinButton';
import numbro from 'numbro';
import UserIcon from '../Icons/UserIcon';

const RoomHeader = () => {
  const { roomData } = useRoomData();
  const classes = useHeaderStyles();
  return (
    <Box className={classes.wrapper}>
      <AvatarPhoto
        className={classes.photo}
        name={roomData.room.name}
        src={null}
        color="#FF026A"
      />
      <Box className={classes.content}>
        <Box className={classes.title}>
          <Typography variant="h4">{roomData.room.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {numbro(roomData.room.usersNumber).format({ average: true })}
          </Typography>
          <UserIcon className={classes.userIcon} />
        </Box>
        <Typography variant="body2" color="textSecondary">
          {roomData.room.description}
        </Typography>
      </Box>
      <RoomHeaderJoinButton roomId={roomData.room.id} />
    </Box>
  );
};

export default RoomHeader;
