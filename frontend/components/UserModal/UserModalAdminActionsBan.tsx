import React from 'react';
import { ListItemText } from '@material-ui/core';
import DropdownItem from '../Dropdown/DropdownItem';
import { useBanUserMutation, UserQuery } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';

const UserModalAdminActionsBan = React.forwardRef<
  HTMLLIElement,
  { userData: UserQuery }
>(({ userData }, ref) => {
  const [banUser] = useBanUserMutation({
    onCompleted: () =>
      globalErrorVar({
        isOpen: true,
        message: `Użytkownik ${
          userData.user.isBanned ? 'odbanowany' : 'Zbanowany'
        }`,
      }),
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
  });

  const handleBanUser = () => {
    banUser({
      variables: {
        id: userData.user.id,
      },
    });
  };

  return (
    <DropdownItem ref={ref} dense onClick={handleBanUser}>
      <ListItemText primary={userData.user.isBanned ? 'Odbanuj' : 'Banuj'} />
    </DropdownItem>
  );
});

UserModalAdminActionsBan.displayName = 'UserModalAdminActionsBan';

export default UserModalAdminActionsBan;
