import { useState } from 'react';

const useOpenCloseModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  return {
    openModal,
    handleClose,
    handleOpen,
  };
};

export default useOpenCloseModal;
