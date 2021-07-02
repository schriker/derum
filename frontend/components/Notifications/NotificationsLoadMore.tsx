import { Box } from '@material-ui/core';
import React from 'react';
import { ButtonSecondary } from '../Buttons/ButtonSecondary';

const NotificationsLoadMore = ({
  fetchMore,
}: {
  fetchMore: () => void;
}) => {
  return (
    <Box display="flex" justifyContent="center" mb={1} mt={2}>
      <ButtonSecondary onClick={fetchMore}>Zobacz więcej</ButtonSecondary>
    </Box>
  );
};

export default NotificationsLoadMore;
