import { Box } from '@material-ui/core';
import React from 'react';
import { useDeleteMessageMutation, useMeQuery } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { globalErrorVar } from '../../lib/apolloVars';
import { MessageActionProps } from '../../types/messages';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessageActions = ({ messageId }: MessageActionProps) => {
  const { roomData } = useRoomData();
  const classes = useChatMessageItemStyles({ userColor: '#FF026A' });
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const [deleteMessage] = useDeleteMessageMutation({
    onError: () =>
      globalErrorVar({ isOpen: true, message: 'Błąd usuwania wiadomości' }),
  });

  const onDeleteMessage = () => {
    deleteMessage({
      variables: {
        id: messageId,
      },
    });
  };

  const isRoomAdmin =
    data?.me.isAdmin ||
    data?.me.isModerator ||
    data?.me.id === roomData?.room.author.id;

  return data ? (
    <Box className={classes.actions}>
      {isRoomAdmin && (
        <ButtonIcon color="secondary" size="small" onClick={onDeleteMessage}>
          <CloseIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      )}
    </Box>
  ) : null;
};

export default ChatMessageActions;
