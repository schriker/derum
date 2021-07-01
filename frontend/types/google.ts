type GoogleSDKOptions = {
  client_id: string;
  cookiepolicy: string;
};

export type GoogleSDK = {
  load: (name: string, callback: () => void) => void;
  auth2: {
    init: (options: GoogleSDKOptions) => GoogleAuth;
  };
};

type GoogleSignInSuccessResponse = {
  access_token: string;
  id_token: string;
};

type GoogleSignInResult = {
  getAuthResponse: (value: boolean) => GoogleSignInSuccessResponse;
};

export type GoogleAuth = {
  signIn: () => Promise<GoogleSignInResult>;
};
