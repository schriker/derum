import { RoomFragmentFragment, RoomQuery } from '../generated/graphql';

type SectionDataItem = {
  id: number;
  name: string;
  usersNumber: number;
};

export type SidebarDrawerItemProps = {
  name: string;
  photo: string;
  usersNumber: number;
  handleClick?: () => void;
};

export type SidebarDrawerSectionProps = {
  title: string;
  sectionData: RoomFragmentFragment[];
};
