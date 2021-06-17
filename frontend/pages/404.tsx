import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { ButtonPrimary } from '../components/Buttons/ButtonPrimary';
import Header from '../components/Header/Header';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
  },
  withBorder: {
    borderRight: `1px solid ${theme.palette.primary['A700']}`,
    paddingRight: 15,
    marginRight: 15,
  },
}));

export default function Custom404(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Header
        title="404 - Nie znaleźliśmy takiej strony."
        ogDescription="Nie znaleźliśmy takiej strony."
      />
      <Box className={classes.wrapper}>
        <Box className={classes.text}>
          <Typography className={classes.withBorder} variant="h3">
            404
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Nie znaleźliśmy takiej strony.
          </Typography>
        </Box>
        <Link href="/" passHref>
          <ButtonPrimary>Strona główna</ButtonPrimary>
        </Link>
      </Box>
    </>
  );
}
