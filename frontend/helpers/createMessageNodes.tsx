/* eslint-disable @next/next/no-img-element */
import { GlobalEmojisQuery } from '../generated/graphql';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { ChatMessageNode } from '../types/messages';
import { Typography } from '@material-ui/core';
import DarkTooltip from '../components/Tooltip/Tooltip';
import ChatMessageUser from '../components/ChatMessageUser/ChatMessageUser';
import Linkify from 'linkifyjs/react';
import { Options } from 'linkifyjs';

const LINKIFY_OPTIONS: Options = {
  target: {
    url: '_blank',
  },
  attributes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onClick: (event: React.MouseEvent) => {
      event.stopPropagation();
    },
    rel: 'noreferrer',
  },
};

const createMessageNodes = (
  body: string,
  authors: string[],
  emojis: GlobalEmojisQuery
): ChatMessageNode[] => {
  const splitBody = body.split(' ');
  const nodes = splitBody.reduce((accumulator, currentvalue) => {
    const isEmoji = emojis?.globalEmojis.filter(
      (emoji) => emoji.name === currentvalue
    );

    if (isEmoji && isEmoji?.length) {
      return [
        ...accumulator,
        {
          type: 'emoji',
          value: isEmoji[0].name,
          component: (
            <span key={uuidv4()}>
              <DarkTooltip
                placement="top"
                title={isEmoji[0].name}
                PopperProps={{ disablePortal: true }}
              >
                <img
                  width={24}
                  height={24}
                  alt={` ${isEmoji[0].name} `}
                  src={`http://derum-public.s3.eu-central-1.amazonaws.com/emojis/${isEmoji[0].file}/2x`}
                />
              </DarkTooltip>
            </span>
          ),
        },
      ];
    } else if (
      currentvalue.match(/^@\w*/) &&
      authors.includes(currentvalue.split('@')[1])
    ) {
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
              <Linkify options={LINKIFY_OPTIONS}>{currentvalue}</Linkify>
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
            <Linkify options={LINKIFY_OPTIONS}>{mergedValue}</Linkify>
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
                <Linkify options={LINKIFY_OPTIONS}>{currentvalue}</Linkify>
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
