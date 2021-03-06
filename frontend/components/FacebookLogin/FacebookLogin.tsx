import { ApolloError } from '@apollo/client';
import React from 'react';
import {
  useLoginUserWithFacebookMutation,
  useMeLazyQuery,
} from '../../generated/graphql';
import { SocialLoginProps } from '../../types/socialLogin';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import FacebookIcon from '../Icons/FacebookIcon';

const FacebookLogin = ({ onSuccess, onError, onLoading }: SocialLoginProps) => {
  const handleError = (error: ApolloError) => {
    onLoading(false);
    onError(true, error);
  };

  const [fetchUser] = useMeLazyQuery({
    onError: handleError,
    onCompleted: (data) => {
      if (data.me) onSuccess();
    },
  });

  const [login] = useLoginUserWithFacebookMutation({
    onCompleted: (data) => {
      if (data.loginUserWithFacebook) fetchUser();
    },
    update(cache, { data: { loginUserWithFacebook } }) {
      if (loginUserWithFacebook) {
        cache.reset();
      }
    },
    onError: handleError,
  });

  const handleFacebookLogin = () => {
    onLoading(true);
    onError(false);
    if (window.FB) {
      window.FB.login(
        (response) => {
          if (!response.authResponse) return onLoading(false);

          login({
            variables: {
              access_token: response.authResponse.accessToken,
            },
          });
        },
        { scope: 'email' }
      );
    }
  };

  return (
    <ButtonSocialLogin
      onClick={handleFacebookLogin}
      startIcon={<FacebookIcon />}
      provider="facebook"
    >
      Zaloguj przez Facebook
    </ButtonSocialLogin>
  );
};

export default FacebookLogin;
