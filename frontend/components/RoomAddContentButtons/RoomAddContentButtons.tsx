import { Box, Divider } from '@material-ui/core';
import React from 'react';
import RoomAddArticle from '../RoomAddArticle/RoomAddArticle';
import useRoomAddContentButtonsStyles from './RoomAddContentButtonsStyles';
import RoomAddLink from '../RoomAddLink/RoomAddLink';
import RoomAddVideo from '../RoomAddVideo/RoomAddVideo';

const RoomAddContentButtons = () => {
  const classes = useRoomAddContentButtonsStyles();

  return (
    <Box className={classes.wrapper}>
      <RoomAddArticle />
      <Divider orientation="vertical" flexItem />
      <RoomAddLink />
      <Divider orientation="vertical" flexItem />
      <RoomAddVideo />
    </Box>
  );
};

export default RoomAddContentButtons;
