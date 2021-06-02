import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import useEntriesSortStyles from './EntriesSortStyles';

const sortButtons = [
  {
    text: 'Najnowsze',
    link: '',
    href: '',
  },
  {
    text: 'Gorące',
    link: 'hot',
    href: '?sort=hot',
  },
  {
    text: 'Najlepsze',
    link: 'popular',
    href: '?sort=popular',
  },
];

const EntriesSort = () => {
  const router = useRouter();
  const classes = useEntriesSortStyles();

  const handleClick = (link: string) => {
    router.push(
      router.query.room ? `/p/${router.query.room}${link}` : `/${link}`
    );
  };

  return (
    <Box className={classes.wrapper}>
      {sortButtons.map((button, index) => {
        const isActive =
          router.query.sort === button.link ||
          (!router.query.sort && button.link === '');
        return (
          <ButtonSecondary
            key={index}
            className={isActive ? null : classes.button}
            onClick={() => handleClick(button.href)}
            size="small"
          >
            {button.text}
          </ButtonSecondary>
        );
      })}
    </Box>
  );
};

export default EntriesSort;
