import { Skeleton } from '@material-ui/lab';
import React from 'react';

const SidebarSkeleton = (): JSX.Element => {
  return (
    <Skeleton
      style={{ marginTop: 10 }}
      variant="circle"
      width={40}
      height={40}
    />
  );
};

export default SidebarSkeleton;
