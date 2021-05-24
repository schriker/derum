import { Dialog, DialogProps } from '@material-ui/core';
import React from 'react';
import { ModalProps } from '../../types/modal';
import ModalContent from './ModalContent';
import ModalTitle from './ModalTitle';

const Modal = ({
  children,
  title,
  close,
  exited,
  open,
  ...rest
}: ModalProps & DialogProps) => {
  return (
    <Dialog
      onExited={exited}
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={open}
      {...rest}
    >
      <ModalTitle id="customized-dialog-title" close={close}>
        {title}
      </ModalTitle>
      <ModalContent className="scrollbar">{children}</ModalContent>
    </Dialog>
  );
};

export default Modal;
