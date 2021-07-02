/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box } from '@material-ui/core';
import { ChatMessageBodyPrpsType, ChatMessageNode } from '../../types/messages';
import { useGlobalEmojisQuery } from '../../generated/graphql';
import createMessageNodes from '../../helpers/createMessageNodes';
import useChatMessageBodyStyles from './useChatMessageBodyStyles';

const ChatMessageBody = ({
  body,
  authors,
}: ChatMessageBodyPrpsType) => {
  const classes = useChatMessageBodyStyles();
  const { data: emojis } = useGlobalEmojisQuery();

  const nodes = createMessageNodes(body, authors, emojis);

  return (
    <Box className={classes.wrapper}>
      {nodes.map((node: ChatMessageNode) => node.component)}
    </Box>
  );
};

export default ChatMessageBody;
