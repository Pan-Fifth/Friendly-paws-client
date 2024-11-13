import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";



const LoginGoogle = () => {
    const { t } = useTranslation();

    const actionLoginGoogle = useAuthStore((state) => state.actionLoginGoogle);
    const navigate = useNavigate();

    const handleLogin = async (credentialResponse) => {

        console.log('credentialResponse:', credentialResponse);
        const token = credentialResponse.credential;
        console.log('credentialResponse.credential:', credentialResponse);

        try {
            const response = await actionLoginGoogle(token);
            toast.success(t('login.toastLogin'));


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
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="m-auto w-[19rem] border rounded-lg">
                <GoogleLogin
                    onSuccess={handleLogin}
                    onError={() => {

                    }}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginGoogle;
