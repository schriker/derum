import React from 'react';
import { ListItemText } from '@material-ui/core';
import DropdownItem from '../Dropdown/DropdownItem';
import {
  useDeleteUserContentMutation,
  UserQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';

const UserModalAdminActionsDeleteContent = React.forwardRef<
  HTMLLIElement,
  { userData: UserQuery }
>(({ userData }, ref) => {
  const [deleteUserContent] = useDeleteUserContentMutation({
    onCompleted: () =>
      globalErrorVar({
        isOpen: true,
        message: 'Usunięto.',
      }),
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const handleDelteUserContent = () => {
    deleteUserContent({
      variables: {
        id: userData.user.id,
      },
    });
  };

  return (
    <DropdownItem ref={ref} dense onClick={handleDelteUserContent}>
      <ListItemText primary="Usuń treści" />
    </DropdownItem>
  );
});

UserModalAdminActionsDeleteContent.displayName =
  'UserModalAdminActionsDeleteContent';

export default UserModalAdminActionsDeleteContent;
