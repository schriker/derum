import React from 'react';
import { Action } from '../../casl/action.enum';
import { Can } from '../../casl/Can';
import {
  PhotoFragmentFragmentDoc,
  useDeletePhotoMutation,
  UserProfileQuery,
  useUploadUserPhotoMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import AvatarUploadInput from '../AvatarUploadInput/AvatarUploadInput';
import useHeaderStyles from './UserHeaderStyles';

const UserHeaderPhoto = ({ userData }: { userData: UserProfileQuery }) => {
  const classes = useHeaderStyles({
    userColor: userData.user.color,
  });
  const [deletePhoto] = useDeletePhotoMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache) => {
      cache.modify({
        id: cache.identify(userData.user),
        fields: {
          photo() {
            return null;
          },
        },
      });
    },
  });
  const [uploadUserPhoto, { loading }] = useUploadUserPhotoMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
    update: (cache, result) => {
      cache.modify({
        id: cache.identify(userData.user),
        fields: {
          photo() {
            const newPhoto = cache.writeFragment({
              data: result.data.uploadUserPhoto,
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
      uploadUserPhoto({
        variables: {
          attachment: files[0],
        },
      });
  };

  return (
    <>
      <Can I={Action.Update} this={userData.user}>
        {() => (
          <AvatarUploadInput
            handleChange={handleChange}
            handleDelete={handleDelete}
            photo={userData.user.photo}
            name={userData.user.displayName}
            loading={loading}
            color={userData.user.color}
          />
        )}
      </Can>
      <Can not I={Action.Update} this={userData.user}>
        {() => (
          <AvatarPhoto
            className={classes.photo}
            name={userData.user.displayName}
            src={userData.user.photo?.url}
            color={userData.user.color}
          />
        )}
      </Can>
    </>
  );
};

export default UserHeaderPhoto;
