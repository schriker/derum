import React from 'react';
import useHeaderStyles from './RoomHeaderStyles';
import useRoomData from '../../hooks/useRoomData';
import { Box, Typography } from '@material-ui/core';
import RoomHeaderJoinButton from './RoomHeaderJoinButton';
import numbro from 'numbro';
import UserIcon from '../Icons/UserIcon';
import RoomHeaderPhoto from './RoomHeaderPhoto';
import { useMeQuery } from '../../generated/graphql';
import UsernameWithModal from '../UsernameWithModal/UsernameWithModal';

const RoomHeader = () => {
  const { roomData } = useRoomData();
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useHeaderStyles({
    userColor:
      !userData || userData?.me.showColorNames
        ? roomData.room.author.color
        : '#fff',
  });

  return (
    <Box className={classes.wrapper}>
      <RoomHeaderPhoto roomData={roomData} />
      <Box className={classes.content}>
        <Box className={classes.title}>
          <Typography variant="h4">{roomData.room.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {numbro(roomData.room.usersNumber).format({ average: true })}
          </Typography>
          <UserIcon className={classes.userIcon} />
        </Box>
        <UsernameWithModal data={roomData.room.author} />
        <Typography variant="body2" color="textSecondary">
          {roomData.room.description}
        </Typography>
      </Box>
      <RoomHeaderJoinButton roomId={roomData.room.id} />
    </Box>
  );
};

export default RoomHeader;
