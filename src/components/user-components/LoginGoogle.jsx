import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {

    const actionLoginGoogle = useAuthStore((state) => state.actionLoginGoogle);
    const navigate = useNavigate();

    const handleLogin = async (credentialResponse) => {

        console.log('credentialResponse:', credentialResponse);
        const token = credentialResponse.credential;

        try {
            const response = await actionLoginGoogle(token);
            console.log(response, "respon googlelogin")


            if (response === 'USER' || response === 'VOLUNTEER') {
                navigate('/');
                console.log(response, "user vourentier")

            }
            else if (response === 'ADMIN') {

                navigate('/admin');
            }

        } catch (error) {
            console.error("Error during login:", error);
        }
    };



    return (
        <GoogleOAuthProvider clientId="278532474715-q84vm9n60ji2qi94j9cronfu4p0fpuuj.apps.googleusercontent.com">
            <div className="m-auto w-[19rem] border rounded-lg">
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginGoogle;
