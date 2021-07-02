import React from 'react';
import {
  CommentFragmentFragment,
  useDeleteCommentMutation,
} from '../../generated/graphql';
import { globalErrorVar } from '../../lib/apolloVars';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import CloseIcon from '../Icons/CloseIcon';

const CommentsItemDelete = ({
  comment,
}: {
  comment: CommentFragmentFragment;
}) => {
  const [deleteComment] = useDeleteCommentMutation({
    onError: () =>
      globalErrorVar({ isOpen: true, message: 'Błąd usuwania wiadomości.' }),
    update: (cache) => {
      cache.modify({
        id: cache.identify(comment),
        fields: {
          body() {
            return null;
          },
        },
      });
    },
  });

  const handleDelete = () => {
    deleteComment({
      variables: {
        commentId: comment.id,
      },
    });
  };

  return (
    <ButtonIcon
      style={{ marginLeft: 10 }}
      color="secondary"
      size="small"
      onClick={handleDelete}
    >
      <CloseIcon style={{ fontSize: 13 }} />
    </ButtonIcon>
  );
};

export default CommentsItemDelete;
