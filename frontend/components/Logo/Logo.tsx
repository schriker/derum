import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logo.png';

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <Image src={logo} alt="Derum" />
      </a>
    </Link>
  );
};

export default Logo;
