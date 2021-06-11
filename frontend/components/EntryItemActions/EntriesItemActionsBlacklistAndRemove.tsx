import React from 'react';
import { ListItemText } from '@material-ui/core';
import {
  EntriesDocument,
  useBlacklistPublisherAndRemoveEntiresMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import DropdownItem from '../Dropdown/DropdownItem';

const EntriesItemActionsBlacklistAndRemove = React.forwardRef<
  HTMLLIElement,
  { id: number }
>(({ id }, ref) => {
  const [blacklistPublisherAndRemoveEntries] =
    useBlacklistPublisherAndRemoveEntiresMutation({
      onCompleted: () =>
        globalErrorVar({
          isOpen: true,
          message: 'Domena została zablokowana i wpisy usunięte.',
        }),
      update: (cache) => {
        cache.modify({
          fields: {
            entries(currentEntries, { readField }) {
              return currentEntries.filter(
                (entry) => readField('id', entry) !== id
              );
            },
          },
        });
      },
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
    <DropdownItem ref={ref} dense onClick={handleBlacklistAndRemove}>
      <ListItemText primary="Zablokuj domene i usuń wpisy" />
    </DropdownItem>
  );
});

export default EntriesItemActionsBlacklistAndRemove;
