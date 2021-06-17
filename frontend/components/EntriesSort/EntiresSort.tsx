import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';
import useEntriesSortStyles from './EntriesSortStyles';

const sortButtons = [
  {
    text: 'Najnowsze',
    link: '',
  },
  // {
  //   text: 'Gorące',
  //   link: 'hot',
  // },
  {
    text: 'Najlepsze',
    link: 'best',
  },
];

const EntriesSort = (): JSX.Element => {
  const router = useRouter();
  const classes = useEntriesSortStyles();

  const handleClick = (link: string) => {
    router.push(
      router.query.room ? `/p/${router.query.room}/${link}` : `/${link}`
    );
  };

  return (
    <Box className={classes.wrapper}>
      {sortButtons.map((button, index) => {
        const isActive =
          router.query.sort?.includes(button.link) ||
          (!router.query.sort && button.link === '');
        return (
          <ButtonSecondary
            key={index}
            className={isActive ? null : classes.button}
            onClick={() => handleClick(button.link)}
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
