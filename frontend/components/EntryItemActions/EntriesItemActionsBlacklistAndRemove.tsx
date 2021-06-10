import React from 'react';
import { ListItemText } from '@material-ui/core';
import { useBlacklistPublisherAndRemoveEntiresMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import DropdownItem from '../Dropdown/DropdownItem';

const EntriesItemActionsBlacklistAndRemove = ({ id }: { id: number }) => {
  const [blacklistPublisherAndRemoveEntries] =
    useBlacklistPublisherAndRemoveEntiresMutation({
      onCompleted: () =>
        globalErrorVar({
          isOpen: true,
          message: 'Domena została zablokowana i wpisy usunięte.',
        }),
      onError: () =>
        globalErrorVar({ isOpen: true, message: 'Błąd blokowania.' }),
    });

  const handleBlacklistAndRemove = () => {
    blacklistPublisherAndRemoveEntries({
      variables: {
        entryId: id,
      },
    });
  };

  return (
    <DropdownItem dense onClick={handleBlacklistAndRemove}>
      <ListItemText primary="Zablokuj domene i usuń wpisy" />
    </DropdownItem>
  );
};

export default EntriesItemActionsBlacklistAndRemove;
