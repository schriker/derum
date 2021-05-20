import { Avatar } from '@material-ui/core';
import React from 'react';

const UserAvatar = ({
  src,
  name,
  color,
}: {
  src: string | null;
  name: string;
  color: string;
}) => {
  return (
    <Avatar
      style={{ width: 30, height: 30, backgroundColor: color }}
      alt={name}
      src={src ? src : null}
    >
      {src ? null : name.split('')[0].toUpperCase()}
    </Avatar>
  );
};

export default UserAvatar;
