/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { EojisPicerPreviewPropsType } from '../../types/emojis';
import useEmojisPickerStyles from './EmojisStyles';

const EmojisPickerPreview = ({
  emoji,
}: EojisPicerPreviewPropsType): JSX.Element => {
  const classes = useEmojisPickerStyles();

  return (
    <Box className={classes.preview}>
      <img
        width={28}
        height={28}
        alt={emoji.name}
        src={`http://derum-public.s3.eu-central-1.amazonaws.com/emojis/${emoji.file}/2x`}
      />
      <Typography variant="subtitle1" component="span">
        {emoji.name}
      </Typography>
    </Box>
  );
};

export default EmojisPickerPreview;
