import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';

const MinusIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M5 11h14v2H5z" />
      </svg>
    </SvgIcon>
  );
};

export default MinusIcon;
