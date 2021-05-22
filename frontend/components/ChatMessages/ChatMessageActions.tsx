import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useDeleteMessageMutation, useMeQuery } from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { MessageActionProps } from '../../types/messages';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessageActions = ({ messageId }: MessageActionProps) => {
  // Use router to fetch room from cache and check if user is owner of the room the allow him to delete messages
  // const router = useRouter();
  // console.log(router);
  const classes = useChatMessageItemStyles({ userColor: '#FF026A' });
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
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

  return data ? (
    <Box className={classes.actions}>
      {(data.me.isAdmin || data.me.isModerator) && (
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
