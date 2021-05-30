import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { openModalVar } from '../../lib/apolloVars';
import { ButtonRoomContent } from '../Buttons/ButtonRoomContent';
import VideoIcon from '../Icons/VideoIcon';

const RoomAddVideo = () => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const handleClick = () => {
    if (!data) return openModalVar(true);
  };

  return (
    <ButtonRoomContent onClick={handleClick} startIcon={<VideoIcon />}>
      Dodaj video
    </ButtonRoomContent>
  );
};

export default RoomAddVideo;
