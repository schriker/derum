import React from 'react';
import useButtonWithAuthAndModal from '../../hooks/useButtonWithAuthAndModal';
import { ButtonRoomContent } from '../Buttons/ButtonRoomContent';
import LinkIcon from '../Icons/LinkIcon';
import RoomNewLinkForm from '../RoomNewLinkForm/RoomNewLinkForm';

const RoomAddLink = () => {
  const { handleButtonClick, handleClose, openModal } =
    useButtonWithAuthAndModal();

  return (
    <>
      <ButtonRoomContent onClick={handleButtonClick} startIcon={<LinkIcon />}>
        Dodaj link
      </ButtonRoomContent>
      <RoomNewLinkForm handleClose={handleClose} openModal={openModal} />
    </>
  );
};

export default RoomAddLink;
