import { OnlineUser } from '../generated/graphql';

export const sortUsersMethod = (a: OnlineUser, b: OnlineUser) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
