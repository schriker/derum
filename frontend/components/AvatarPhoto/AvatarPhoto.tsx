import { Avatar } from '@material-ui/core';
import React from 'react';
import { AvatarProps } from '../../types/avatar';

const AvatarPhoto = ({
  src,
  name,
  styles,
  onClick,
  className,
  color,
}: AvatarProps): JSX.Element => {
  return (
    <Avatar
      onClick={onClick}
      className={className}
      style={{
        ...styles,
        backgroundColor: src ? null : color,
      }}
      alt={name}
      src={src ? src : null}
    >
      {src ? null : name.split('')[0].toUpperCase()}
    </Avatar>
  );
};

export default React.memo(AvatarPhoto, () => true);
