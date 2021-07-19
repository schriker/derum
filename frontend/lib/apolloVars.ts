import { makeVar } from '@apollo/client';
import { Color } from '@material-ui/lab/Alert';

export const openModalVar = makeVar(false);
export const selectedUserVar = makeVar<string | null>(null);
export const openDrawerVar = makeVar(false);
export const globalErrorVar = makeVar<{
  isOpen: boolean;
  message: string;
  type?: Color;
}>({
  isOpen: false,
  type: 'error',
  message: '',
});
