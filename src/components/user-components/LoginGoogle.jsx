import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';

const LoginGoogle = () => {

    const actionLoginGoogle = useAuthStore((state) => state.actionLoginGoogle);
    const navigate = useNavigate();

    const handleLogin = async (credentialResponse) => {

        const token = credentialResponse.credential;

        try {
            const response = await actionLoginGoogle(token);

            if (response && response.token) {
                const userRole = response.user.role;

                if (userRole === 'USER' || userRole === 'VOLUNTEER') {
                    navigate('/');
                } else if (userRole === 'ADMIN') {
                    navigate('/admin/home');
                } else {
                    console.log("Unknown role, redirecting to default page");
                    navigate('/notfound');
                }
            } else {
                console.log("Login failed or no token received");
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
