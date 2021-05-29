import { FieldError } from 'react-hook-form';

export type FormInputTypeProps = {
  name: string;
  control: any;
  label: string;
  error: FieldError;
  inputRender: (field: any, id: string) => any;
};
