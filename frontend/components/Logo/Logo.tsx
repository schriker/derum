import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import { Box } from '@material-ui/core';

const Logo = (): JSX.Element => {
  return (
    <Box ml={1} mt="4px">
      <Link href="/">
        <a>
          <Image width={79} height={30} src={logo} alt="Derum" />
        </a>
      </Link>
    </Box>
  );
};

export default Logo;
