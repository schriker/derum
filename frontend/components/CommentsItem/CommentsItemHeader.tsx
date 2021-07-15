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
import { Action } from '../../casl/action.enum';
import { Can } from '../../casl/Can';

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

  return (
    <Box className={classes.headerWrapper}>
      <Box display="flex">
        <Box className={classes.header}>
          <UsernameWithModal photo data={data.author} />
          <Typography
            color="textSecondary"
            variant="subtitle2"
            component="span"
            title={dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm')}
          >
            {dayjs().to(dayjs(data.createdAt))}
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
        <Can I={Action.Delete} this={{ ...data, room: roomData.room }}>
          {() => <CommentsItemDelete comment={data} />}
        </Can>
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
