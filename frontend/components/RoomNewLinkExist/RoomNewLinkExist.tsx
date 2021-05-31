import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React from 'react';
import { CheckLinkExsitsQuery } from '../../generated/graphql';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';

const RoomNewLinkExist = ({
  data,
  closeModal,
}: {
  closeModal: () => void;
  data: CheckLinkExsitsQuery['checkLinkExsits'];
}) => {
  const router = useRouter();

  const handleClick = () => {
    closeModal();
    router.push(`/w/${data[0].id}`);
  };

  return (
    <Box>
      <Alert
        variant="filled"
        severity="warning"
        action={
          <ButtonPrimary onClick={handleClick} color="default" size="small">
            Zobacz
          </ButtonPrimary>
        }
      >
        Wygląda na to, że ten link jest już dodany.
      </Alert>
    </Box>
  );
};

export default RoomNewLinkExist;
