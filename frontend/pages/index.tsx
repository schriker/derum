import { Button } from '@material-ui/core';
import React from 'react';

export default function Home() {
  const handleFacebookLogin = () => {
    if (window.FB) {
      window.FB.login(
        (response) => {
          console.log(response);
        },
        { scope: 'email' }
      );
    }
  };

  return (
    <div>
      <Button color="secondary" onClick={handleFacebookLogin}>
        Zaloguj
      </Button>
    </div>
  );
}
