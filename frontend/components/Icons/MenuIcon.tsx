import { SvgIcon } from '@material-ui/core';
import React from 'react';

const MenuIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
          fill="#FAFAFA"
        />
      </svg>
    </SvgIcon>
  );
};

export default MenuIcon;
