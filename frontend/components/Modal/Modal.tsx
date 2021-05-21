import { Dialog } from '@material-ui/core';
import React from 'react';
import { ModalProps } from '../../types/modal';
import ModalContent from './ModalContent';
import ModalTitle from './ModalTitle';

const Modal = ({ children, title, isOpen, close, exited }: ModalProps) => {
  return (
    <Dialog
      onExited={exited}
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <ModalTitle id="customized-dialog-title" close={close}>
        {title}
      </ModalTitle>
      <ModalContent>{children}</ModalContent>
    </Dialog>
  );
};

export default Modal;
