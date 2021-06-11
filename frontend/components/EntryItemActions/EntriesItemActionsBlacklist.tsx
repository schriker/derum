import React from 'react';
import { ListItemText } from '@material-ui/core';
import { useBlacklistPublisherMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import DropdownItem from '../Dropdown/DropdownItem';

const EntriesItemActionsBlacklist = React.forwardRef<
  HTMLLIElement,
  { id: number }
>(({ id }, ref) => {
  const [blacklistPublisher] = useBlacklistPublisherMutation({
    onCompleted: () =>
      globalErrorVar({ isOpen: true, message: 'Domena została zablokowana.' }),
    onError: () =>
      globalErrorVar({ isOpen: true, message: 'Błąd blokowania.' }),
  });

  const handleBlacklist = () => {
    blacklistPublisher({
      variables: {
        entryId: id,
      },
    });
  };

  return (
    <DropdownItem ref={ref} dense onClick={handleBlacklist}>
      <ListItemText primary="Zablokuj domene" />
    </DropdownItem>
  );
});

export default EntriesItemActionsBlacklist;
