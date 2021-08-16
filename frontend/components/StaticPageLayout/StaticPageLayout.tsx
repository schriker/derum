import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { StaticPageLayoutPropsType } from '../../types/staticPage';
import useStaticPageLayoutStyles from './StaticPageLayoutStyles';

const StaticPageLayout = ({ title, children }: StaticPageLayoutPropsType) => {
  const classes = useStaticPageLayoutStyles();

  return (
    <Box className={`${classes.wrapper} scrollbar`}>
      <Box width="lg" className={classes.content}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default StaticPageLayout;
