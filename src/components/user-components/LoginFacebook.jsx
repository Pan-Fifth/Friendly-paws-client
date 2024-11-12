import React, { useEffect } from "react";

const FacebookLogin = () => {
  useEffect(() => {
    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1207639353682154", // Replace with your App ID
        autoLogAppEvents: true,
        xfbml: true,
        version: "v15.0",
      });
    };
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          console.log("Welcome! Fetching your information...");
          window.FB.api("/me", { fields: "name,email,picture" }, (userData) => {
            console.log("Good to see you, ", userData);
            // You can now use userData for further steps
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scope: "email" } // Request email permission
    );
  };

  return (
    <div>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default FacebookLogin;
