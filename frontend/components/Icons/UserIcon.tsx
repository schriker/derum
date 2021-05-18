import { SvgIcon } from '@material-ui/core';
import React from 'react';

const UserIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M6 19.75C6 18.1587 6.63214 16.6326 7.75736 15.5074C8.88258 14.3821 10.4087 13.75 12 13.75C13.5913 13.75 15.1174 14.3821 16.2426 15.5074C17.3679 16.6326 18 18.1587 18 19.75H6ZM12 13C9.51375 13 7.5 10.9863 7.5 8.5C7.5 6.01375 9.51375 4 12 4C14.4863 4 16.5 6.01375 16.5 8.5C16.5 10.9863 14.4863 13 12 13Z"
            fill="#FAFAFA"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default UserIcon;
