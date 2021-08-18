import { Box, Divider, Hidden } from '@material-ui/core';
import React from 'react';
import RoomAddArticle from '../RoomAddArticle/RoomAddArticle';
import useRoomAddContentButtonsStyles from './RoomAddContentButtonsStyles';
import RoomAddLink from '../RoomAddLink/RoomAddLink';
// import RoomAddVideo from '../RoomAddVideo/RoomAddVideo';

const RoomAddContentButtons = () => {
  const classes = useRoomAddContentButtonsStyles();

  return (
    <Box className={classes.wrapper}>
      <RoomAddArticle />
      <Hidden xsDown>
        <Divider orientation="vertical" flexItem />
      </Hidden>
      <RoomAddLink />
      {/* <Divider orientation="vertical" flexItem />
      <RoomAddVideo /> */}
    </Box>
  );
};

export default RoomAddContentButtons;
