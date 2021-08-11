import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import HomeIcon from '../Icons/HomeIcon';
import DarkTooltip from '../Tooltip/Tooltip';

const SidebarHomeLink = () => {
  const router = useRouter();

  return (
    <Link href={router.query.room ? `/p/${router.query.room}` : '/'} passHref>
      <DarkTooltip
        title={router.query.room ? router.query.room : 'Główna'}
        placement="right"
      >
        <ButtonIcon color="secondary">
          <HomeIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      </DarkTooltip>
    </Link>
  );
};

export default SidebarHomeLink;
