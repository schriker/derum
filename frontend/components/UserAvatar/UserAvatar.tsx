import { Avatar } from '@material-ui/core';
import React from 'react';
import { AvatarProps } from '../../types/avatar';

const UserAvatar = ({ src, name, styles, onClick, className }: AvatarProps) => {
  return (
    <Avatar
      onClick={onClick}
      className={className}
      style={styles}
      alt={name}
      src={src ? src : null}
    >
      {src ? null : name.split('')[0].toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
