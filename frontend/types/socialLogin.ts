export interface SocialLoginProps {
  onSuccess: () => void;
  onError: (error: boolean) => void;
  onLoading: (loading: boolean) => void;
}
