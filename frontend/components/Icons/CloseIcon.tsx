import { SvgIcon } from '@material-ui/core';
import React from 'react';

const CloseIcon = (props) => {
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
          d="M11.636 10.525L15.525 6.63599L16.636 7.74692L12.7469 11.636L16.636 15.525L15.525 16.636L11.636 12.7469L7.74692 16.636L6.63599 15.525L10.525 11.636L6.63599 7.74692L7.74692 6.63599L11.636 10.525Z"
          fill="#FAFAFA"
        />
      </svg>
    </SvgIcon>
  );
};

export default CloseIcon;
