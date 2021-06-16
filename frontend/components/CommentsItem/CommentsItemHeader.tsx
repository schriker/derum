import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { CommentFragmentFragment } from '../../generated/graphql';
import { CommentItemPropsType } from '../../types/comment';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItemHeader = ({
  data,
  setUserId,
  handleOpen,
}: CommentItemPropsType) => {
  const classes = useCommentsItemStyles({
    userColor: '#FF026A',
  });

  const handleUserSelect = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  return (
    <Box className={classes.header}>
      <AvatarPhoto
        styles={{
          width: 30,
          height: 30,
        }}
        color="#FF026A"
        onClick={(e) => handleUserSelect(data.author.id)}
        className={classes.photo}
        src={data.author.photo}
        name={data.author.displayName}
      />
      <Typography
        variant="subtitle1"
        component="span"
        className={classes.author}
        onClick={(e) => handleUserSelect(data.author.id)}
      >
        {data.author.displayName}
      </Typography>
      <Typography color="textSecondary" variant="subtitle2" component="span">
        {dayjs(data.createdAt.createdAt).format('DD.MM.YYYY - HH:mm')}
      </Typography>
    </Box>
  );
};

export default CommentsItemHeader;
