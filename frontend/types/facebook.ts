export type FacebookResponse = {
  authResponse: {
    accessToken: string;
  };
};

type FacebookInitOptions = {
  appId: string;
  cookie: boolean;
  xfbml: boolean;
  version: string;
};

export type FacebookSDK = {
  init: (options: FacebookInitOptions) => void;
  login: (
    callback: (response: FacebookResponse) => void,
    options: {
      scope: string;
    }
  ) => void;
};
