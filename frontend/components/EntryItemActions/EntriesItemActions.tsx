import React from 'react';
import {
  EntryFragmentFragment,
  EntryType,
  useMeQuery,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import MoreActionsMenu from '../MoreActionsMenu/MoreActionsMenu';
import EntriesItemActionsBlacklist from './EntriesItemActionsBlacklist';
import EntriesItemActionsBlacklistAndRemove from './EntriesItemActionsBlacklistAndRemove';
import EntriesItemActionsDelete from './EntriesItemActionsDelete';

const EntriesItemActions = ({
  entryData,
}: {
  entryData: EntryFragmentFragment;
}): JSX.Element => {
  const { roomData } = useRoomData();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const isRoomAdmin =
    data?.me.isAdmin ||
    data?.me.isModerator ||
    data?.me.id === roomData?.room.author.id;

  return data && isRoomAdmin ? (
    <MoreActionsMenu>
      <EntriesItemActionsDelete id={entryData.id} />
      {data?.me.isAdmin && entryData.type === EntryType.LINK && (
        <EntriesItemActionsBlacklist id={entryData.id} />
      )}
      {data?.me.isAdmin && entryData.type === EntryType.LINK && (
        <EntriesItemActionsBlacklistAndRemove id={entryData.id} />
      )}
    </MoreActionsMenu>
  ) : null;
};

export default EntriesItemActions;
