import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { openDrawerVar } from '../../lib/apolloVars';
import { SidebarDrawerSectionProps } from '../../types/sidebar';
import SidebarDrawerItem from './SidebarDrawerItem';
import useSidebarStyles from './SidebarStyles';

const SidebarDrawerSection = ({
  title,
  sectionData,
}: SidebarDrawerSectionProps) => {
  const classes = useSidebarStyles({});
  const router = useRouter();

  const handleClick = (name: string) => {
    openDrawerVar(false);
    router.push(`/p/${name}`);
  };

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
        <SidebarDrawerItem
          photo={item.photo?.url}
          name={item.name}
          usersNumber={item.usersNumber}
          handleClick={() => handleClick(item.name)}
          key={item.id}
        />
      ))}
    </>
  );
};

export default SidebarDrawerSection;
