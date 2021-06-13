import React from 'react';
import {
  PhotoFragmentFragmentDoc,
  RoomQuery,
  useMeQuery,
  useUploadRoomPhotoMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import useHeaderStyles from './RoomHeaderStyles';

const RoomHeaderPhoto = ({ roomData }: { roomData: RoomQuery }) => {
  const classes = useHeaderStyles();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [uploadRoomPhoto] = useUploadRoomPhotoMutation({
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

  const isRoomAdmin =
    data?.me.isAdmin ||
    data?.me.isModerator ||
    data?.me.id === roomData?.room.author.id;

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

  return isRoomAdmin ? (
    <>
      <input
        accept="image/*"
        className={classes.input}
        id="room-photo-file"
        type="file"
        onChange={handleChange}
      />
      <ButtonIcon className={classes.uploadButton}>
        <label htmlFor="room-photo-file" className={classes.uploadButton}>
          <AvatarPhoto
            className={classes.photo}
            name={roomData.room.name}
            src={roomData.room.photo?.url}
            styles={{
              border: '2px solid #FF026A',
            }}
            color="#FF026A"
          />
        </label>
      </ButtonIcon>
    </>
  ) : (
    <AvatarPhoto
      className={classes.photo}
      name={roomData.room.name}
      src={roomData.room.photo?.url}
      styles={{
        border: '2px solid #FF026A',
      }}
      color="#FF026A"
    />
  );
};

export default RoomHeaderPhoto;
