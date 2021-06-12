import React from 'react';
import { RoomQuery, useMeQuery } from '../../generated/graphql';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import useHeaderStyles from './RoomHeaderStyles';

const RoomHeaderPhoto = ({ roomData }: { roomData: RoomQuery }) => {
  const classes = useHeaderStyles();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const isRoomAdmin =
    data?.me.isAdmin ||
    data?.me.isModerator ||
    data?.me.id === roomData?.room.author.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files[0])

         // Create an object of formData 
         const formData = new FormData(); 
     
         // Update the formData object 
         formData.append( 
           "roomPhoto", 
           e.target.files[0],
           e.target.files[0].name
         ); 
  }

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
            src={null}
            color="#FF026A"
          />
        </label>
      </ButtonIcon>
    </>
  ) : (
    <AvatarPhoto
      className={classes.photo}
      name={roomData.room.name}
      src={null}
      color="#FF026A"
    />
  );
};

export default RoomHeaderPhoto;
