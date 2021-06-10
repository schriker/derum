import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import React from 'react';
import { CheckLinkExsitsQuery } from '../../generated/graphql';
import { ButtonDefault } from '../Buttons/ButtonDefault';

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
    router.push(`/p/${data[0].room.name}/${data[0].id}/${data[0].slug}`);
  };

  return (
    <Box>
      <Alert
        variant="filled"
        severity="warning"
        action={
          !data[0].deleted ? (
            <ButtonDefault onClick={handleClick} size="small">
              Zobacz
            </ButtonDefault>
          ) : null
        }
      >
        Wygląda na to, że ten link jest już dodany.
      </Alert>
    </Box>
  );
};

export default RoomNewLinkExist;
