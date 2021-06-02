import { Box } from '@material-ui/core';
import React from 'react';
import {
  RoomFragmentFragmentDoc,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useMeQuery,
} from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { globalErrorVar, openModalVar } from '../../lib/apolloVars';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import { ButtonPrimary } from '../Buttons/ButtonPrimary';

const RoomHeaderJoinButton = ({ roomId }: { roomId: number }) => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { roomData } = useRoomData();
  const isJoined = data?.me.joinedRooms.some((room) => room.id === roomId);
  const [joinRoom, { loading: joinLoading }] = useJoinRoomMutation({
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
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
    onError: (e) => globalErrorVar({ isOpen: true, message: e.message }),
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
    if (!data) return openModalVar(true);
    if (isJoined)
      return leaveRoom({
        variables,
      });

    return joinRoom({
      variables,
    });
  };

  return (
    <Box>
      {isJoined ? (
        <ButtonDefault disabled={isLoading} onClick={handleClick} size="small">
          Opuść
        </ButtonDefault>
      ) : (
        <ButtonPrimary disabled={isLoading} onClick={handleClick} size="small">
          Dołącz
        </ButtonPrimary>
      )}
    </Box>
  );
};

export default RoomHeaderJoinButton;
