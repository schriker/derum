import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { openModalVar } from '../../lib/apolloVars';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import NewRoomForm from './NewRoomForm';
import useNewRoomStyles from './NewRoomStyles';

const NewRoomButton = () => {
  const { data } = useMeQuery();
  const classes = useNewRoomStyles();
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();

  const handleButtonClick = () => {
    if (!data) {
      openModalVar(true);
    } else {
      handleOpen();
    }
  };

  return (
    <>
      <ButtonPrimary
        onClick={handleButtonClick}
        className={classes.newRoomButton}
        color="primary"
      >
        Utwórz nowy pokój
      </ButtonPrimary>
      <NewRoomForm openModal={openModal} handleClose={handleClose} />
    </>
  );
};

export default NewRoomButton;
