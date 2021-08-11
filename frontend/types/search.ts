import React, { ChangeEvent } from 'react';
import { SearchQuery } from '../generated/graphql';

export type SearchInputProps = {
  value: string;
  placeholder: string;
  style?: React.CSSProperties;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type SearchDropdownProps = {
  anchorEl: null | HTMLElement;
  data: SearchQuery;
  loading: boolean;
};

export type SearchUsersListProps = {
  users: SearchQuery['search']['users'];
};

export type SearchCommentsListProps = {
  comments: SearchQuery['search']['comments'];
};

export type SearchEntiresListProps = {
  entries: SearchQuery['search']['entires'];
};
