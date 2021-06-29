/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useGlobalEmojisQuery } from '../../generated/graphql';
import createMessageNodes from '../../helpers/createMessageNodes';
import { ChatMessageNode } from '../../types/messages';
import useChatMessageBodyStyles from './useChatMessageBodyStyles';

const ChatMessageBody = ({ body }: { body: string }): JSX.Element => {
  const classes = useChatMessageBodyStyles();
  const { data: emojis } = useGlobalEmojisQuery();

  if (!emojis) return <Typography variant="body2">{body}</Typography>;
  const nodes = createMessageNodes(body, emojis);

  return (
    <Box className={classes.wrapper}>
      {nodes.map((node: ChatMessageNode) => node.component)}
    </Box>
  );
};

export default React.memo(ChatMessageBody, () => true);
