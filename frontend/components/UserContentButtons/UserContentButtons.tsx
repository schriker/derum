import { Box, Divider } from '@material-ui/core';
import numbro from 'numbro';
import { polishPlurals } from 'polish-plurals';
import React from 'react';
import { UserContentButtonsProps } from '../../types/userProfile';
import ButtonRoomContent from '../Buttons/ButtonRoomContent';
import ArticleIcon from '../Icons/ArticleIcon';
import ChatIcon from '../Icons/ChatIcon';
import CommentsIcon from '../Icons/CommentsIcon';
import useUserContentButtonsStyles from './UserContentButtonsStyles';

const UserContentButtons = ({
  data,
  setIndex,
  tabIndex,
}: UserContentButtonsProps) => {
  const classes = useUserContentButtonsStyles();

  const buttons = [
    {
      text: `${numbro(data.user.entriesNumber).format({
        average: true,
      })} ${polishPlurals(
        ' wpis',
        ' wpisy',
        ' wpisów',
        data.user.entriesNumber
      )}`,
      icon: <ArticleIcon />,
    },
    {
      text: `${numbro(data.user.commentsNumber).format({
        average: true,
      })} ${polishPlurals(
        ' komentarz',
        ' komentarze',
        ' komentarzy',
        data.user.commentsNumber
      )}`,
      icon: <CommentsIcon />,
    },
    {
      text: `${numbro(data.user.messagesNumber).format({
        average: true,
      })} ${polishPlurals(
        ' wiadomość',
        ' wiadomości',
        ' wiadomości',
        data.user.messagesNumber
      )}`,
      icon: <ChatIcon />,
    },
  ];

  return (
    <Box className={classes.wrapper}>
      {buttons.map((button, index) => {
        return (
          <Box className={classes.button} key={index}>
            <ButtonRoomContent
              isActive={index === tabIndex}
              onClick={() => setIndex(index)}
              startIcon={button.icon}
            >
              {button.text}
            </ButtonRoomContent>
            {index < buttons.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default UserContentButtons;
