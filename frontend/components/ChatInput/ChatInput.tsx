import { Box, InputAdornment } from '@material-ui/core';
import React from 'react';
import { ButtonIcon } from '../Buttons/ButtonIcon';
import { CustomInput } from '../CustomInput/CustomInput';
import EmoticonsIcon from '../Icons/EmoticonsIcon';
import SendIcon from '../Icons/SendIcon';

const ChatInput = () => {
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
          placeholder="Wiadomość"
          endAdornment={
            <InputAdornment position="end">
              <ButtonIcon
                color="secondary"
                size="small"
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
              >
                <EmoticonsIcon style={{ fontSize: 24 }} />
              </ButtonIcon>
            </InputAdornment>
          }
        />
      </Box>
      <Box mx={1}>
        <ButtonIcon color="primary">
          <SendIcon style={{ fontSize: 16 }} />
        </ButtonIcon>
      </Box>
    </Box>
  );
};

export default ChatInput;
