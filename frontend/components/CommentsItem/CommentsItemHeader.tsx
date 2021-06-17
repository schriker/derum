import { Box, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import React from 'react';
import { CommentItemPropsType } from '../../types/comment';
import AvatarPhoto from '../AvatarPhoto/AvatarPhoto';
import { ButtonDefault } from '../Buttons/ButtonDefault';
import useCommentsItemStyles from './CommentsItemStyles';

const CommentsItemHeader = ({
  data,
  setUserId,
  handleOpen,
  setParentId,
  parentId,
}: CommentItemPropsType): JSX.Element => {
  const classes = useCommentsItemStyles({
    userColor: '#FF026A',
  });

  const handleUserSelect = (id: number) => {
    setUserId(id);
    handleOpen();
  };

  return (
    <Box className={classes.headerWrapper}>
      <Box className={classes.header}>
        <AvatarPhoto
          styles={{
            width: 30,
            height: 30,
          }}
          color="#FF026A"
          onClick={() => handleUserSelect(data.author.id)}
          className={classes.photo}
          src={data.author.photo}
          name={data.author.displayName}
        />
        <Typography
          variant="subtitle1"
          component="span"
          className={classes.author}
          onClick={() => handleUserSelect(data.author.id)}
        >
          {data.author.displayName}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" component="span">
          {dayjs(data.createdAt.createdAt).format('DD.MM.YYYY - HH:mm')}
        </Typography>
      </Box>
      <ButtonDefault
        onClick={() => setParentId(data.id === parentId ? null : data.id)}
        className={classes.replyButton}
        size="small"
      >
        {data.id === parentId ? 'Anuluj' : 'Odpowiedz'}
      </ButtonDefault>
    </Box>
  );
};

export default CommentsItemHeader;
