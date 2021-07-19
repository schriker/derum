import { ApolloError } from '@apollo/client';

export type EmailLoginInputs = {
  email: string;
  password: string;
};

export type ResetPasswordInputs = {
  email: string;
};

export type EmailRegisterInputs = {
  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};

export interface EmailLoginProps {
  onSuccess: () => void;
  onError: (open: boolean, error?: ApolloError) => void;
  onLoading: (loading: boolean) => void;
  setTabIndex: (index: number) => void;
}
