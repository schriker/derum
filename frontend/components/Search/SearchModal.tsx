import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { openSearchModal } from '../../lib/apolloVars';
import Modal from '../Modal/Modal';
import Search from './Search';

const SearchModal = () => {
  const openModal = useReactiveVar(openSearchModal);

  const handleClose = () => {
    openSearchModal(false);
  };

  return (
    <Modal
      title="Wyszukiwarka"
      fullWidth
      maxWidth="xs"
      open={openModal}
      close={handleClose}
    >
      <Search />
    </Modal>
  );
};

export default SearchModal;
