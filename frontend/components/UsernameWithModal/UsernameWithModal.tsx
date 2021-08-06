import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useMeQuery } from '../../generated/graphql';
import useOpenCloseModal from '../../hooks/useOpenCloseModal';
import { UsernameWithModalPropsType } from '../../types/username';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import UserModal from '../UserModal/UserModal';
import useUsernameWithModalStyles from './UsernameWithModalStyles';

const UsernameWithModal = ({
  data,
  photo = false,
}: UsernameWithModalPropsType) => {
  const { data: userData } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [userId, setUserId] = useState(null);
  const { openModal, handleClose, handleOpen } = useOpenCloseModal();
  const classes = useUsernameWithModalStyles({
    userColor: !userData || userData?.me.showColorNames ? data.color : '#fff',
  });

  const handleUserSelect = () => {
    setUserId(data.id);
    handleOpen();
  };

  return (
    <>
      {(!userData || userData?.me.showAvatars) && photo ? (
        <AvatarPhoto
          styles={{
            width: 30,
            height: 30,
          }}
          color={data.color}
          onClick={handleUserSelect}
          className={classes.photo}
          src={data.photo?.url}
          name={data.displayName}
        />
      ) : null}
      <Typography
        variant="subtitle1"
        component="span"
        className={classes.userName}
        onClick={handleUserSelect}
      >
        {data.displayName}
      </Typography>
      {userId && (
        <UserModal
          openModal={openModal}
          handleClose={handleClose}
          id={userId}
        />
      )}
    </>
  );
};

export default UsernameWithModal;
