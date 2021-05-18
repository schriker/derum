import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <img src="/logo.png" alt="Derum" />
      </a>
    </Link>
  );
};

export default Logo;
