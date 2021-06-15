import React from 'react';
import {
  EntryFragmentFragment,
  EntryType,
  useMeQuery,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import Dropdown from '../Dropdown/Dropdown';
import MoreIcon from '../Icons/MoreIcon';
import EntriesItemActionsBlacklist from './EntriesItemActionsBlacklist';
import EntriesItemActionsBlacklistAndRemove from './EntriesItemActionsBlacklistAndRemove';
import EntriesItemActionsDelete from './EntriesItemActionsDelete';

const EntriesItemActions = ({
  entryData,
}: {
  entryData: EntryFragmentFragment;
}) => {
  const { roomData } = useRoomData();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
        <EntriesItemActionsDelete id={entryData.id} />
        {data?.me.isAdmin && entryData.type === EntryType.LINK && (
          <EntriesItemActionsBlacklist id={entryData.id} />
        )}
        {data?.me.isAdmin && entryData.type === EntryType.LINK && (
          <EntriesItemActionsBlacklistAndRemove id={entryData.id} />
        )}
      </Dropdown>
    </>
  ) : null;
};

export default EntriesItemActions;
