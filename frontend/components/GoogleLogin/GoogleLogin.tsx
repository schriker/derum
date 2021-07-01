import React from 'react';
import { ApolloError } from '@apollo/client';
import {
  useLoginUserWithGoogleMutation,
  useMeLazyQuery,
} from '../../generated/graphql';
import GoogleIcon from '../Icons/GoogleIcon';
import { SocialLoginProps } from '../../types/socialLogin';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';

const GoogleLogin = ({
  onSuccess,
  onError,
  onLoading,
}: SocialLoginProps): JSX.Element => {
  const hadleError = (error: ApolloError) => {
    onLoading(false);
    onError(true, error);
  };

  const [fetchUser] = useMeLazyQuery({
    onError: hadleError,
    onCompleted: (data) => {
      if (data.me) onSuccess();
    },
  });

  const [login] = useLoginUserWithGoogleMutation({
    onCompleted: (data) => {
      if (data.loginUserWithGoogle) fetchUser();
    },
    update(cache, { data: { loginUserWithGoogle } }) {
      if (loginUserWithGoogle) {
        cache.reset();
      }
    },
    onError: hadleError,
  });

  const handleGoogleLogin = async () => {
    if (window.googleAuth) {
      onLoading(true);
      onError(false);
      try {
        const res = await window.googleAuth.signIn();
        const authResponse = res.getAuthResponse(true);
        login({
          variables: {
            access_token: authResponse.access_token,
          },
        });
      } catch (e) {
        onLoading(false);
      }
    }
  };

  return (
    <ButtonSocialLogin
      onClick={handleGoogleLogin}
      id="google"
      startIcon={<GoogleIcon />}
      provider="google"
    >
      Zaloguj przez Google
    </ButtonSocialLogin>
  );
};

export default GoogleLogin;
