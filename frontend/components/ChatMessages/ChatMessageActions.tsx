import { Box } from '@material-ui/core';
import React from 'react';
import { useDeleteMessageMutation, useMeQuery } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { globalErrorVar } from '../../lib/apolloVars';
import { MessageActionProps } from '../../types/messages';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';
import useChatMessageItemStyles from './ChatMessageItemStyles';

const ChatMessageActions = ({ messageId }: MessageActionProps): JSX.Element => {
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
  });

  const onDeleteMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
          color="secondary"
          size="small"
          onClick={(e) => onDeleteMessage(e)}
        >
          <CloseIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      )}
    </Box>
  ) : null;
};

export default ChatMessageActions;
