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
  const router = useRouter();
  const classes = useChatMessageItemStyles({ userColor: '#FF026A' });
  // console.log(router);
  const { data } = useMeQuery({
    nextFetchPolicy: 'cache-only',
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

  return data ? (
    <Box className={classes.actions} onClick={(e) => e.stopPropagation()}>
      {(data.me.isAdmin || data.me.isModerator) && (
        <ButtonIcon color="secondary" size="small" onClick={onDeleteMessage}>
          <CloseIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      )}
    </Box>
  ) : null;
};

export default ChatMessageActions;
