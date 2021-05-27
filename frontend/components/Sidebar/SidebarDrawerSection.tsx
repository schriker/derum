import { Typography } from '@material-ui/core';
import React from 'react';
import { SidebarDrawerSectionProps } from '../../types/sidebar';
import SidebarDrawerItem from './SidebarDrawerItem';
import useSidebarStyles from './SidebarStyles';

const SidebarDrawerSection = ({
  title,
  sectionData,
}: SidebarDrawerSectionProps) => {
  const classes = useSidebarStyles();

  return (
    <>
      <Typography
        className={classes.sectionTitle}
        variant="body1"
        color="textSecondary"
      >
        {title}
      </Typography>
      {sectionData.map((item) => (
        <SidebarDrawerItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default SidebarDrawerSection;
