import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { loginFacebook } from "../../apis/AuthApi";

function FacebookLoginButton() {
    const handleFacebookLogin = async (response) => {
        const { accessToken, userID } = response;

        if (accessToken && userID) {
            try {
                const backendResponse = await loginFacebook(accessToken, userID);
                console.log('Login Success:', backendResponse.data);
            } catch (error) {
                console.error('Login Failed:', error);
            }
        } else {
            console.error('Facebook login failed');
        }
    };

    return (
        <div>
            <FacebookLogin
                appId="1357505362348323"
                autoLoad={false}
                fields="name,email"
                callback={handleFacebookLogin}
                icon="fa-facebook"
                textButton="Login with Facebook"
            />
        </div>
    );
}

export default FacebookLoginButton;
