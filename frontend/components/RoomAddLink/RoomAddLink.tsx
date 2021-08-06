import React, { useState } from 'react';
import { MetadataQuery } from '../../generated/graphql';
import useButtonWithAuthAndModal from '../../hooks/useButtonWithAuthAndModal';
import ButtonRoomContent from '../Buttons/ButtonRoomContent';
import LinkIcon from '../Icons/LinkIcon';
import Modal from '../Modal/Modal';
import RoomNewLinkForm from '../RoomNewLinkForm/RoomNewLinkForm';
import RoomNewLinkMetadataForm from '../RoomNewLinkForm/RoomNewLinkMetadataForm';

const RoomAddLink = () => {
  const [linkMetadata, setLinkMetadata] = useState<
    MetadataQuery['metadata'] | null
  >(null);
  const { handleButtonClick, handleClose, openModal } =
    useButtonWithAuthAndModal();

  return (
    <>
      <ButtonRoomContent onClick={handleButtonClick} startIcon={<LinkIcon />}>
        Dodaj link
      </ButtonRoomContent>
      <Modal
        fullWidth
        maxWidth="sm"
        title="Nowy link"
        open={openModal}
        close={handleClose}
      >
        {linkMetadata ? (
          <RoomNewLinkMetadataForm
            setLinkMetadata={setLinkMetadata}
            metadata={linkMetadata}
            closeModal={handleClose}
          />
        ) : (
          <RoomNewLinkForm setLinkMetadata={setLinkMetadata} />
        )}
      </Modal>
    </>
  );
};

export default RoomAddLink;
