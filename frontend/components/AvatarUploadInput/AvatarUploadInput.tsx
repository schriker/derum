import { CircularProgress, Box, Typography } from '@material-ui/core';
import React from 'react';
import { AvatarUploadInputProps } from '../../types/avatar';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import useAvatarUploadStyles from './AvatarUploadInputStyles';

const AvatarUploadInput = ({
  name,
  photo,
  handleChange,
  handleDelete,
  loading,
}: AvatarUploadInputProps) => {
  const classes = useAvatarUploadStyles();

  const Photo = (
    <AvatarPhoto
      className={classes.photo}
      name={name}
      src={photo?.url}
      color="#FF026A"
    />
  );

  return (
    <Box className={classes.photoWrapper}>
      {!photo ? (
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
          onClick={() => handleDelete(photo.id)}
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
  );
};

export default AvatarUploadInput;
