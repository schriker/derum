import Link from 'next/link';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import HomeIcon from '../Icons/HomeIcon';
import DarkTooltip from '../Tooltip/Tooltip';

const SidebarHomeLink = () => {
  return (
    <Link href="/">
      <DarkTooltip title="Główna" enterDelay={500} placement="right">
        <ButtonIcon color="secondary">
          <HomeIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      </DarkTooltip>
    </Link>
  );
};

export default SidebarHomeLink;
