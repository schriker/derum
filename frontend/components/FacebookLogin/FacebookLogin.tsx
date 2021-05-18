import React, { useEffect } from 'react';
import {
  useLoginUserWithFacebookMutation,
  useMeLazyQuery,
} from '../../generated/graphql';
import { SocialLoginProps } from '../../types/socialLogin';
import { ButtonSocialLogin } from '../Buttons/ButtonSocialLogin';
import FacebookIcon from '../Icons/FacebookIcon';

const FacebookLogin = ({ onSuccess, onError, onLoading }: SocialLoginProps) => {
  const [login, { data: loginData, error: loginError }] =
    useLoginUserWithFacebookMutation();
  const [fetchUser, { data: userData, error: userError }] = useMeLazyQuery();

  useEffect(() => {
    if (loginError || userError) {
      onLoading(false);
      onError(true);
    }
  }, [loginError, userError]);

  useEffect(() => {
    if (loginData?.loginUserWithFacebook) {
      fetchUser();
    }
  }, [loginData]);

  useEffect(() => {
    if (userData) {
      onSuccess();
    }
  }, [userData]);

  const handleFacebookLogin = () => {
    onLoading(true);
    onError(false);
    if (window.FB) {
      window.FB.login(
        (response: any) => {
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
