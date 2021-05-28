import React from 'react';
import {
  useLoginUserWithFacebookMutation,
  useMeLazyQuery,
} from '../../generated/graphql';
import { SocialLoginProps } from '../../types/socialLogin';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import FacebookIcon from '../Icons/FacebookIcon';

const FacebookLogin = ({ onSuccess, onError, onLoading }: SocialLoginProps) => {
  const hadleError = () => {
    onLoading(false);
    onError(true);
  };

  const [fetchUser] = useMeLazyQuery({
    // onError: hadleError,
    onError: (e) => console.log(e),
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
    // onError: hadleError,
    onError: (e) => console.log(e),
  });

  const handleFacebookLogin = () => {
    onLoading(true);
    onError(false);
    if (window.FB) {
      window.FB.login(
        (response: any) => {
          if (!response.authResponse) {
            onLoading(false);
          } else {
            login({
              variables: {
                access_token: response.authResponse.accessToken,
              },
            });
          }
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
