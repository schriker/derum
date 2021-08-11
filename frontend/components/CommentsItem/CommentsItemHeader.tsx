import { Box, Link } from '@material-ui/core';
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
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const CommentsItemHeader = ({
  data,
  setParentId,
  parentId,
  entryIsDeleted,
  searchView,
}: CommentItemPropsType) => {
  const router = useRouter();
  const { data: userdata } = useMeQuery({
    fetchPolicy: 'cache-only',
  });
  const { roomData } = useRoomData();
  const classes = useCommentsItemStyles({
    userColor:
      !userdata || userdata?.me.showColorNames ? data.author.color : '#fff',
    isHighlighted: false,
  });

  let url = null;

  if (!setParentId) {
    url = `/p/${data.entry.room.name}/w/${data.entry.id}/${data.entry.slug}?comment=${data.id}`;
  } else {
    url = `/p/${router.query.room}/w/${router.query.id[0]}/${router.query.id[1]}?comment=${data.id}`;
  }

  return (
    <Box className={classes.headerWrapper}>
      <Box display="flex">
        <Box className={classes.header}>
          <UsernameWithModal photo data={data.author} />
          <NextLink href={url} passHref>
            <Link
              variant="subtitle2"
              color="textSecondary"
              title={dayjs(data.createdAt).format('DD.MM.YYYY - HH:mm')}
            >
              {dayjs().to(dayjs(data.createdAt))}
            </Link>
          </NextLink>
        </Box>
        {data.parentId && <CommentsItemResponseTo data={data} />}
      </Box>
      <Box>
        {userdata && !entryIsDeleted && setParentId && (
          <ButtonDefault
            onClick={() => setParentId(data.id === parentId ? null : data.id)}
            className={classes.replyButton}
            size="small"
          >
            {data.id === parentId ? 'Anuluj' : 'Odpowiedz'}
          </ButtonDefault>
        )}
        {!searchView && (
          <Can I={Action.Delete} this={{ ...data, room: roomData.room }}>
            {() => <CommentsItemDelete comment={data} />}
          </Can>
        )}
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
