import React from 'react';
import { ListItemText } from '@material-ui/core';
import {
  EntryFragmentFragment,
  useDeleteEntryMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import DropdownItem from '../Dropdown/DropdownItem';

const EntriesItemActionsDelete = React.forwardRef<
  HTMLLIElement,
  { data: EntryFragmentFragment }
>(({ data }, ref) => {
  const [deleteEntry] = useDeleteEntryMutation({
    onCompleted: () =>
      globalErrorVar({ isOpen: true, message: 'Wpis został usunięty.' }),
    update: (cache) => {
      cache.modify({
        id: cache.identify(data),
        fields: {
          deleted() {
            return true;
          },
          url() {
            return null;
          },
          photo() {
            return null;
          },
          body() {
            return null;
          },
        },
      });
      cache.modify({
        fields: {
          entries(currentEntries, { readField }) {
            return currentEntries.filter(
              (entry) => readField('id', entry) !== data.id
            );
          },
        },
      });
    },
    onError: () =>
      globalErrorVar({ isOpen: true, message: 'Błąd usuwania wiadomości.' }),
  });

  const handleDelete = () => {
    deleteEntry({ variables: { id: data.id } });
  };

  return (
    <DropdownItem ref={ref} dense onClick={handleDelete}>
      <ListItemText primary="Usuń" />
    </DropdownItem>
  );
});

export default EntriesItemActionsDelete;
