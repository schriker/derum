import { Box } from '@material-ui/core';
import React from 'react';
import { UserQuery } from '../../generated/graphql';
import MoreActionsMenu from '../MoreActionsMenu/MoreActionsMenu';
import UserModalAdminActionsBan from './UserModalAdminActionsBan';
import UserModalAdminActionsDeleteContent from './UserModalAdminActionsDeleteContent';

const UserModalAdminActions = ({
  userData,
}: {
  userData: UserQuery;
}): JSX.Element => {
  return (
    <Box ml={1}>
      <MoreActionsMenu>
        <UserModalAdminActionsBan userData={userData} />
        <UserModalAdminActionsDeleteContent userData={userData} />
      </MoreActionsMenu>
    </Box>
  );
};

export default UserModalAdminActions;
