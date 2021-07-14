import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import useRoomData from '../../hooks/useRoomData';
import { CommentItemPropsType } from '../../types/comment';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import UsernameWithModal from '../UsernameWithModal/UsernameWithModal';
import CommentsItemDelete from './CommentsItemDelete';
import CommentsItemResponseTo from './CommentsItemResponseTo';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItemHeader = ({
  data,
  setParentId,
  parentId,
}: CommentItemPropsType) => {
  const { data: userdata } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { roomData } = useRoomData();
  const classes = useCommentsItemStyles({
    userColor:
      !userdata || userdata?.me.showColorNames ? data.author.color : '#fff',
    isHighlighted: false,
  });

  const canDeleteComment =
    userdata?.me.isAdmin ||
    userdata?.me.isModerator ||
    roomData?.room.author.id === userdata?.me.id ||
    userdata?.me.id === data.author.id;

  return (
    <Box className={classes.headerWrapper}>
      <Box display="flex">
        <Box className={classes.header}>
          <UsernameWithModal photo data={data.author} />
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="span"
          >
            {dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm:ss')}
          </Typography>
        </Box>
        {data.parentId && <CommentsItemResponseTo data={data} />}
      </Box>
      <Box>
        {userdata && (
          <ButtonDefault
            onClick={() => setParentId(data.id === parentId ? null : data.id)}
            className={classes.replyButton}
            size="small"
          >
            {data.id === parentId ? 'Anuluj' : 'Odpowiedz'}
          </ButtonDefault>
        )}
        {canDeleteComment && <CommentsItemDelete comment={data} />}
      </Box>
    </Box>
  );
};

const areEqual = (
  prevProps: CommentItemPropsType,
  nextProps: CommentItemPropsType
) => {
  if (prevProps.parentId !== nextProps.parentId) return false;
  return true;
};

export default React.memo(CommentsItemHeader, areEqual);
