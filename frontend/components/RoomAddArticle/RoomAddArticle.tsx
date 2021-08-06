import React from 'react';
import useButtonWithAuthAndModal from '../../hooks/useButtonWithAuthAndModal';
import ButtonRoomContent from '../Buttons/ButtonRoomContent';
import ArticleIcon from '../Icons/ArticleIcon';
import Modal from '../Modal/Modal';
import RoomNewArticleForm from '../RoomNewArticleForm/RoomNewArticleForm';

const RoomAddArticle = () => {
  const { handleButtonClick, handleClose, openModal } =
    useButtonWithAuthAndModal();

  return (
    <>
      <ButtonRoomContent
        onClick={handleButtonClick}
        startIcon={<ArticleIcon />}
      >
        Utwórz wpis
      </ButtonRoomContent>
      <Modal
        fullWidth
        maxWidth="md"
        title="Nowy wpis"
        open={openModal}
        close={handleClose}
      >
        <RoomNewArticleForm closeModal={handleClose} />
      </Modal>
    </>
  );
};

export default RoomAddArticle;
