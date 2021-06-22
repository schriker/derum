import { ApolloError } from '@apollo/client';

export interface SocialLoginProps {
  onSuccess: () => void;
  onError: (open: boolean, error?: ApolloError) => void;
  onLoading: (loading: boolean) => void;
}
