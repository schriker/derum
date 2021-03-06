import { Avatar } from '@material-ui/core';
import React from 'react';
import { AvatarProps } from '../../types/avatar';

const AvatarPhoto = React.forwardRef(
  ({ src, name, styles, onClick, className, color }: AvatarProps, ref) => {
    return (
      <Avatar
        innerRef={ref}
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
  }
);

AvatarPhoto.displayName = 'AvatarPhoto';

const areEqual = (prevProps: AvatarProps, nextProps: AvatarProps) => {
  if (prevProps.src !== nextProps.src) return false;
  return true;
};

export default React.memo(AvatarPhoto, areEqual);
