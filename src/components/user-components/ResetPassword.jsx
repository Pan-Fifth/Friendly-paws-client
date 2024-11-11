import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../apis/AuthApi';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {

    const { t } = useTranslation()
    const { token } = useParams()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {

            const response = await resetPassword(token, { password });

            setMessage(response.data.message);
            navigate('/login');
        } catch (error) {
            setMessage('Failed to reset password');

        }
    };


    return (
        <div className='bg-gray-300 mx-auto w-96 h-96 mt-40 rounded-md flex flex-col justify-center items-center gap-6 p-4 '>
            <h2 className='font-main'>{t("resetPassword.title")}</h2>
            <input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-2 rounded-xl w-2/3'
            />
            <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='p-2 rounded-xl w-2/3'
            />
            <button onClick={handleResetPassword} className='bg-yellow p-2 rounded-lg font-head'>
                {t("resetPassword.confirm")}
            </button>
            {message && <p>{message}</p>}
        </div>
    )
}
