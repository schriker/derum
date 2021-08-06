import React from 'react';
import { Action } from '../../casl/action.enum';
import { Can } from '../../casl/Can';
import {
  PhotoFragmentFragmentDoc,
  RoomQuery,
  useDeletePhotoMutation,
  useUploadRoomPhotoMutation
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import AvatarUploadInput from '../AvatarUploadInput/AvatarUploadInput';
import useHeaderStyles from './RoomHeaderStyles';

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

  const handleDelete = (id: number) => {
    deletePhoto({
      variables: {
        id: id,
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

  return (
    <>
      <Can I={Action.Update} this={roomData.room}>
        {() => (
          <AvatarUploadInput
            handleChange={handleChange}
            handleDelete={handleDelete}
            photo={roomData.room.photo}
            name={roomData.room.name}
            loading={loading}
          />
        )}
      </Can>
      <Can not I={Action.Update} this={roomData.room}>
        {() => (
          <AvatarPhoto
            className={classes.photo}
            name={roomData.room.name}
            src={roomData.room.photo?.url}
            color="#FF026A"
          />
        )}
      </Can>
    </>
  );
};

export default RoomHeaderPhoto;
