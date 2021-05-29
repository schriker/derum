import { Box, Divider } from '@material-ui/core';
import React from 'react';
import { ButtonRoomContent } from '../Buttons/ButtonRoomContent';
import ArticleIcon from '../Icons/ArticleIcon';
import LinkIcon from '../Icons/LinkIcon';
import VideoIcon from '../Icons/VideoIcon';
import useRoomAddContentButtonsStyles from './RoomAddContentButtonsStyles';

const RoomAddContentButtons = () => {
  const classes = useRoomAddContentButtonsStyles();

  return (
    <Box className={classes.wrapper}>
      <ButtonRoomContent startIcon={<ArticleIcon />}>
        Utwórz wpis
      </ButtonRoomContent>
      <Divider orientation="vertical" flexItem />
      <ButtonRoomContent startIcon={<LinkIcon />}>Dodaj link</ButtonRoomContent>
      <Divider orientation="vertical" flexItem />
      <ButtonRoomContent startIcon={<VideoIcon />}>
        Dodaj video
      </ButtonRoomContent>
    </Box>
  );
};

export default RoomAddContentButtons;
