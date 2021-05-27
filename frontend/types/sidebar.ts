type SectionDataItem = {
  id: number;
  name: string;
  usersNumber: number;
};

export type SidebarDrawerItemProps = {
  name: string;
  usersNumber: number;
};

export type SidebarDrawerSectionProps = {
  title: string;
  sectionData: SectionDataItem[];
};
