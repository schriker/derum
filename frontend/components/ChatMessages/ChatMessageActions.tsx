import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { indexRoomVars } from '../../consts';
import {
  useDeleteMessageMutation,
  useMeQuery,
  useRoomQuery,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { MessageActionProps } from '../../types/messages';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessageActions = ({ messageId }: MessageActionProps) => {
  const classes = useChatMessageItemStyles({ userColor: '#FF026A' });
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const { data: roomData } = useRoomQuery({
    variables: {
      name: indexRoomVars.name,
    },
  });

  const [deleteMessage, { loading }] = useDeleteMessageMutation({
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
        <ButtonIcon
          disabled={loading}
          color="secondary"
          size="small"
          onClick={onDeleteMessage}
        >
          <CloseIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      )}
    </Box>
  ) : null;
};

export default ChatMessageActions;
