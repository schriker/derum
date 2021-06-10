import React from 'react';
import { ListItemText } from '@material-ui/core';
import { useDeleteEntryMutation } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import DropdownItem from '../Dropdown/DropdownItem';

const EntriesItemActionsDelete = ({ id }: { id: number }) => {
  const [deleteEntry] = useDeleteEntryMutation({
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
      globalErrorVar({ isOpen: true, message: 'Błąd usuwania wiadomości.' }),
  });

  const handleDelete = () => {
    deleteEntry({ variables: { id: id } });
  };

  return (
    <DropdownItem dense onClick={handleDelete}>
      <ListItemText primary="Usuń" />
    </DropdownItem>
  );
};

export default EntriesItemActionsDelete;
