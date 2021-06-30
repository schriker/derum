/* eslint-disable @next/next/no-img-element */
import { GlobalEmojisQuery } from '../generated/graphql';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { ChatMessageNode } from '../types/messages';
import { Typography } from '@material-ui/core';
import DarkTooltip from '../components/Tooltip/Tooltip';
import ChatMessageUser from '../components/ChatMessageUser/ChatMessageUser';

const createMessageNodes = (
  body: string,
  emojis: GlobalEmojisQuery
): ChatMessageNode[] => {
  const splitBody = body.split(' ');
  const nodes = splitBody.reduce((accumulator, currentvalue) => {
    const [isEmoji] = emojis?.globalEmojis.filter(
      (emoji) => emoji.name === currentvalue
    );
    if (isEmoji) {
      return [
        ...accumulator,
        {
          type: 'emoji',
          value: isEmoji.name,
          component: (
            <span key={uuidv4()}>
              <DarkTooltip
                placement="top"
                title={isEmoji.name}
                enterDelay={500}
                PopperProps={{ disablePortal: true }}
              >
                <img
                  width={24}
                  height={24}
                  alt={` ${isEmoji.name} `}
                  src={`http://derum-public.s3.eu-central-1.amazonaws.com/emojis/${isEmoji.file}/2x`}
                />
              </DarkTooltip>
            </span>
          ),
        },
      ];
    } else if (currentvalue.match(/^@\w*/)) {
      return [
        ...accumulator,
        {
          type: 'user',
          value: currentvalue,
          component: <ChatMessageUser key={uuidv4()} value={currentvalue} />,
        },
      ];
    } else if (!accumulator.length) {
      return [
        ...accumulator,
        {
          type: 'text',
          value: currentvalue,
          component: (
            <Typography key={uuidv4()} variant="body2" component="span">
              {currentvalue}
            </Typography>
          ),
        },
      ];
    } else {
      if (accumulator[accumulator.length - 1].type === 'text') {
        const mergedValue = `${
          accumulator[accumulator.length - 1].value
        } ${currentvalue}`;
        accumulator[accumulator.length - 1].value = mergedValue;

        accumulator[accumulator.length - 1].component = (
          <Typography key={uuidv4()} variant="body2" component="span">
            {mergedValue}
          </Typography>
        );
        return accumulator;
      } else {
        return [
          ...accumulator,
          {
            type: 'text',
            value: currentvalue,
            component: (
              <Typography key={uuidv4()} variant="body2" component="span">
                {currentvalue}
              </Typography>
            ),
          },
        ];
      }
    }
  }, [] as ChatMessageNode[]);

  return nodes as ChatMessageNode[];
};

export default createMessageNodes;
