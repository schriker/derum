import { NotificationsQuery } from "../generated/graphql";

export type NotificationsDropdownPropsType = {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  data: NotificationsQuery
};
