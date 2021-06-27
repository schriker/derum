import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { CommentItemPropsType } from '../../types/comment';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import CommentsItemDelete from './CommentsItemDelete';
import CommentsItemResponseTo from './CommentsItemResponseTo';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItemHeader = ({
  data,
  setUserId,
  handleOpen,
  setParentId,
  parentId,
}: CommentItemPropsType): JSX.Element => {
  const { data: userdata } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const classes = useCommentsItemStyles({
    userColor:
      !userdata || userdata?.me.showColorNames ? data.author.color : '#fff',
  });

  const handleUserSelect = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  return (
    <Box className={classes.headerWrapper}>
      <Box display="flex">
        <Box className={classes.header}>
          {!userdata || userdata?.me.showAvatars ? (
            <AvatarPhoto
              styles={{
                width: 25,
                height: 25,
              }}
              color={data.author.color}
              onClick={() => handleUserSelect(data.author.id)}
              className={classes.photo}
              src={data.author.photo}
              name={data.author.displayName}
            />
          ) : null}
          <Typography
            variant="subtitle1"
            component="span"
            className={classes.author}
            onClick={() => handleUserSelect(data.author.id)}
          >
            {data.author.displayName}
          </Typography>
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
        {userdata?.me.isAdmin || userdata?.me.isModerator ? (
          <CommentsItemDelete comment={data} />
        ) : null}
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
