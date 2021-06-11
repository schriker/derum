import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { NewLinkPreviewProps } from '../../types/newLink';
import useRoomNewLinkPreviewStyles from './RoomNewLinkPreviewStyles';

const RoomNewLinkPreview = ({ metadata }: NewLinkPreviewProps) => {
  const classes = useRoomNewLinkPreviewStyles();

  return (
    <Card className={classes.wrapper} elevation={0}>
      {metadata.photo && (
        <CardMedia
          component="img"
          className={classes.photo}
          image={metadata.photo}
          title={metadata.title}
        />
      )}
      <CardContent>
        <Typography component="h5" variant="h5">
          {metadata.title}
        </Typography>
        <Box className={classes.info}>
          <Chip size="small" label={metadata.publisher} />
        </Box>
        <Typography variant="body2" color="textSecondary">
          {metadata.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomNewLinkPreview;
