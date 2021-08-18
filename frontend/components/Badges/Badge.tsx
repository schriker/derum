import { Box } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import { BadgePropsType } from '../../types/badge';
import DarkTooltip from '../Tooltip/Tooltip';

const Badge = ({ title, image }: BadgePropsType) => {
  return (
    <DarkTooltip
      placement="top"
      title={title}
      PopperProps={{ disablePortal: true }}
    >
      <Box mr="5px" display="flex">
        <Image width={16} height={16} src={image} alt={title} />
      </Box>
    </DarkTooltip>
  );
};

export default Badge;
