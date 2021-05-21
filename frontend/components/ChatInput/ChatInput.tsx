import { Box, InputAdornment } from '@material-ui/core';
import React from 'react';
import { openModalVar } from '../../lib/apolloVars';
import { useMeQuery } from '../../generated/graphql';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { CustomInput } from '../CustomInput/CustomInput';
import EmoticonsIcon from '../Icons/EmoticonsIcon';
import SendIcon from '../Icons/SendIcon';

const ChatInput = () => {
  const { data } = useMeQuery({
    nextFetchPolicy: 'cache-only',
  });

  const handleSendMessage = () => {
    if (!data) {
      openModalVar(true);
    }
  };

  return (
    <Box
      minHeight={70}
      py={2}
      display="flex"
      alignItems="center"
      flex="1 1 auto"
    >
      <Box flex="1 0 auto">
        <CustomInput
          inputProps={{ maxLength: 500 }}
          placeholder="Wiadomość"
          endAdornment={
            <InputAdornment position="end">
              <ButtonIcon color="secondary" size="small">
                <EmoticonsIcon style={{ fontSize: 24 }} />
              </ButtonIcon>
            </InputAdornment>
          }
        />
      </Box>
      <Box mx={1}>
        <ButtonIcon color="primary" onClick={handleSendMessage}>
          <SendIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      </Box>
    </Box>
  );
};

export default ChatInput;
