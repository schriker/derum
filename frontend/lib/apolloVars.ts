import { makeVar } from '@apollo/client';

export const openModalVar = makeVar(false);
export const selectedUserVar = makeVar<string | null>(null);
export const openDrawerVar = makeVar(false);
export const globalErrorVar = makeVar({
  isOpen: false,
  message: '',
});
