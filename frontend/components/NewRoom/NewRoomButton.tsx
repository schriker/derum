import React from 'react';
import useButtonWithAuthAndModal from '../../hooks/useButtonWithAuthAndModal';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';
import NewRoomForm from './NewRoomForm';
import useNewRoomStyles from './NewRoomStyles';

const NewRoomButton = (): JSX.Element => {
  const classes = useNewRoomStyles();
  const { handleButtonClick, handleClose, openModal } =
    useButtonWithAuthAndModal();

  return (
    <>
      <ButtonPrimary
        onClick={handleButtonClick}
        className={classes.newRoomButton}
        size="large"
      >
        Utwórz nowy pokój
      </ButtonPrimary>
      <NewRoomForm openModal={openModal} handleClose={handleClose} />
    </>
  );
};

export default NewRoomButton;
