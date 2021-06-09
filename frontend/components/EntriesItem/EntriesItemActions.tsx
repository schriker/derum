import { ListItemText } from '@material-ui/core';
import React from 'react';
import { useDeleteEntryMutation, useMeQuery } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { globalErrorVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import MoreIcon from '../Icons/MoreIcon';

const EntriesItemActions = ({ id }: { id: number }) => {
  const { roomData } = useRoomData();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const isRoomAdmin =
    data?.me.isAdmin ||
    data?.me.isModerator ||
    data?.me.id === roomData?.room.author.id;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return data && isRoomAdmin ? (
    <>
      <ButtonIcon onClick={handleClick} size="small" color="secondary">
        <MoreIcon style={{ fontSize: 18 }} />
      </ButtonIcon>
      <Dropdown
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <DropdownItem dense onClick={() => deleteEntry({ variables: { id } })}>
          <ListItemText primary="Usuń" />
        </DropdownItem>
        {data?.me.isAdmin && (
          <>
            <DropdownItem dense onClick={() => console.log('asd')}>
              <ListItemText primary="Zablokuj domene" />
            </DropdownItem>
            <DropdownItem dense onClick={() => console.log('asd')}>
              <ListItemText primary="Zablokuj domene i usuń wpisy" />
            </DropdownItem>
          </>
        )}
      </Dropdown>
    </>
  ) : null;
};

export default EntriesItemActions;
