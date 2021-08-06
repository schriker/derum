import { Box } from '@material-ui/core';
import React from 'react';
import { Action } from '../../casl/action.enum';
import { Can } from '../../casl/Can';
import { useDeleteMessageMutation, useMeQuery } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { globalErrorVar } from '../../lib/apolloVars';
import { MessageActionProps } from '../../types/messages';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessageActions = ({ message }: MessageActionProps) => {
  const { roomData } = useRoomData();
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useChatMessageItemStyles({
    userColor: data?.me.color,
  });

  const [deleteMessage] = useDeleteMessageMutation({
    onError: () =>
      globalErrorVar({ isOpen: true, message: 'Błąd usuwania wiadomości.' }),
    update: (cache) => {
      cache.modify({
        id: cache.identify(message),
        fields: {
          body() {
            return null;
          },
        },
      });
    },
  });

  const onDeleteMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteMessage({
      variables: {
        id: message.id,
      },
    });
  };

  return data ? (
    <Box className={classes.actions}>
      <Can I={Action.Delete} this={{ ...message, room: roomData.room }}>
        {() => (
          <ButtonIcon
            color="secondary"
            size="small"
            onClick={(e) => onDeleteMessage(e)}
          >
            <CloseIcon style={{ fontSize: 16 }} />
          </ButtonIcon>
        )}
      </Can>
    </Box>
  ) : null;
};

export default ChatMessageActions;
