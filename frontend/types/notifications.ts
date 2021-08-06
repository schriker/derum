import {
  NotificationFragmentFragment,
  NotificationsQuery,
} from '../generated/graphql';

export type NotificationsDropdownPropsType = {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  data: NotificationsQuery;
  fetchMore: () => void;
  hasMore: boolean;
};

export type NotificationsItemPropsType = {
  data: NotificationFragmentFragment;
};
