import React from 'react';
import { Action } from '../../casl/action.enum';
import { Can } from '../../casl/Can';
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
}) => {
  const { roomData } = useRoomData();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  return (
    <Can I={Action.Delete} this={{ ...entryData, room: roomData?.room }}>
      {() => (
        <MoreActionsMenu>
          <EntriesItemActionsDelete data={entryData} />
          {data?.me.isAdmin && entryData.type === EntryType.LINK && (
            <EntriesItemActionsBlacklist id={entryData.id} />
          )}
          {data?.me.isAdmin && entryData.type === EntryType.LINK && (
            <EntriesItemActionsBlacklistAndRemove id={entryData.id} />
          )}
        </MoreActionsMenu>
      )}
    </Can>
  );
};

export default EntriesItemActions;
