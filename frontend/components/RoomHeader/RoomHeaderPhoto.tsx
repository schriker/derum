import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { Action } from '../../casl/action.enum';
import {
  PhotoFragmentFragmentDoc,
  RoomQuery,
  useDeletePhotoMutation,
  useUploadRoomPhotoMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import useHeaderStyles from './RoomHeaderStyles';
import { Can } from '../../casl/Can';
import CloseIcon from '../Icons/CloseIcon';

const RoomHeaderPhoto = ({ roomData }: { roomData: RoomQuery }) => {
  const classes = useHeaderStyles();
  const [deletePhoto] = useDeletePhotoMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache) => {
      cache.modify({
        id: cache.identify(roomData.room),
        fields: {
          photo() {
            return null;
          },
        },
      });
    },
  });
  const [uploadRoomPhoto, { loading }] = useUploadRoomPhotoMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache, result) => {
      cache.modify({
        id: cache.identify(roomData.room),
        fields: {
          photo() {
            const newPhoto = cache.writeFragment({
              data: result.data.uploadRoomPhoto,
              fragment: PhotoFragmentFragmentDoc,
              fragmentName: 'PhotoFragment',
            });
            return newPhoto;
          },
        },
      });
    },
  });

  const handleDelete = () => {
    deletePhoto({
      variables: {
        id: roomData.room.photo.id,
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = e;
    if (validity.valid)
      uploadRoomPhoto({
        variables: {
          attachment: files[0],
          roomId: roomData.room.id,
        },
      });
  };

  const Photo = (
    <AvatarPhoto
      className={classes.photo}
      name={roomData.room.name}
      src={roomData.room.photo?.url}
      color="#FF026A"
    />
  );

  return (
    <>
      <Can I={Action.Update} this={roomData.room}>
        {() => (
          <Box className={classes.photoWrapper}>
            {!roomData.room.photo ? (
              <>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="room-photo-file"
                  type="file"
                  onChange={handleChange}
                />
                <ButtonIcon className={classes.uploadButton}>
                  <label
                    htmlFor="room-photo-file"
                    className={classes.uploadButton}
                  >
                    {Photo}
                  </label>
                </ButtonIcon>
                {loading && (
                  <CircularProgress size={60} className={classes.progress} />
                )}
              </>
            ) : (
              <ButtonIcon
                className={classes.uploadButton}
                onClick={handleDelete}
              >
                <Box>
                  <Typography
                    className={classes.deleteLabel}
                    variant="body1"
                    color="textPrimary"
                    component="span"
                  >
                    <CloseIcon />
                  </Typography>
                  {Photo}
                </Box>
              </ButtonIcon>
            )}
          </Box>
        )}
      </Can>
      <Can not I={Action.Update} this={roomData.room}>
        {() => Photo}
      </Can>
    </>
  );
};

export default RoomHeaderPhoto;
