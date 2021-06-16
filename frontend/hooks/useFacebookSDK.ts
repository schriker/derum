import { useEffect, useState } from 'react';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

const useFacebookSDK = () => {
  const [FbSDKLoaded, setFbSDKLoaded] = useState(false);

  useEffect(() => {
    setupFacebook();
  }, []);

  const setupFacebook = () => {
    if (document.getElementById('facebook-jssdk')) {
      setFbSDKLoaded(true);
      return;
    }
    setFbAsyncInit();
    loadSdkAsynchronously();
    createFbRoot();
  };

  const setFbAsyncInit = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v11.0',
      });
      setFbSDKLoaded(true);
    };
  };

  const loadSdkAsynchronously = () => {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      // @ts-ignore
      js.src = `https://connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const createFbRoot = () => {
    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
  };

  return {
    FbSDKLoaded,
  };
};

export default useFacebookSDK;
