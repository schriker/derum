import { Box } from '@material-ui/core';
import React from 'react';
import {
  RoomFragmentFragmentDoc,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useMeQuery,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { globalErrorVar } from '../../lib/apolloVars';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';

const RoomHeaderJoinButton = ({ roomId }: { roomId: number }) => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { roomData } = useRoomData();
  const isJoined = data?.me.joinedRooms.some((room) => room.id === roomId);
  const [joinRoom, { loading: joinLoading }] = useJoinRoomMutation({
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
    update(cache) {
      cache.modify({
        id: cache.identify(data.me),
        fields: {
          joinedRooms(prev) {
            const roomRef = cache.writeFragment({
              data: roomData.room,
              fragment: RoomFragmentFragmentDoc,
              fragmentName: 'RoomFragment',
            });
            return [...prev, roomRef];
          },
        },
      });
    },
  });

  const [leaveRoom, { loading: leaveLoading }] = useLeaveRoomMutation({
    onError: () => globalErrorVar({ isOpen: true, message: 'Błąd serwera!' }),
    update(cache) {
      cache.modify({
        id: cache.identify(data.me),
        fields: {
          joinedRooms(prev, { readField }) {
            return prev.filter((room) => roomId !== readField('id', room));
          },
        },
      });
    },
  });

  const isLoading = leaveLoading || joinLoading;

  const handleClick = () => {
    const variables = {
      id: roomId,
    };
    if (isJoined) {
      leaveRoom({
        variables,
      });
    } else {
      joinRoom({
        variables,
      });
    }
  };

  return (
    <Box>
      <ButtonPrimary
        disabled={isLoading}
        onClick={handleClick}
        color={isJoined ? 'default' : 'primary'}
        size="small"
      >
        {isJoined ? 'Opuść' : 'Dołącz'}
      </ButtonPrimary>
    </Box>
  );
};

export default RoomHeaderJoinButton;
