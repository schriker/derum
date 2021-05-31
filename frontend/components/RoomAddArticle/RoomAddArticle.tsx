import React from 'react';
import { useMeQuery } from '../../generated/graphql';
import { openModalVar } from '../../lib/apolloVars';
import { ButtonRoomContent } from '../Buttons/ButtonRoomContent';
import ArticleIcon from '../Icons/ArticleIcon';

const RoomAddArticle = () => {
  const { data } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const handleClick = () => {
    if (!data) return openModalVar(true);
  };

  return (
    <ButtonRoomContent onClick={handleClick} startIcon={<ArticleIcon />}>
      Utwórz wpis
    </ButtonRoomContent>
  );
};

export default RoomAddArticle;
