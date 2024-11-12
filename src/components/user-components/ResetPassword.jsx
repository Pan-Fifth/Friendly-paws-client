import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../apis/AuthApi';
import { useTranslation } from 'react-i18next';
import validateResetPassword from '@/src/utils/ResetPasswordVaidate';

export default function ResetPassword() {
    const { t } = useTranslation();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [formatError, setFormatError] = useState({})


    const navigate = useNavigate();

    const handleResetPassword = async () => {
        // if (password !== confirmPassword) {
        //     setMessage('Passwords do not match');
        //     return;
        // }
        const error = validateResetPassword({ password, confirmPassword }, t)

        if (error) {

            return setFormatError(error)
        }
        try {
            setLoading(true);
            const response = await resetPassword(token, { password });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 2000); // Wait before redirecting
        } catch (error) {
            setMessage('Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
                <h2 className="text-3xl font-semibold text-purple-500  text-center mb-6">{t("resetPassword.title")}</h2>

                <div className="space-y-4">
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 rounded-lg w-full border border-gray-300 focus:outline-none focus:border-purple-500"
                    />
                    {formatError && <p className='text-red-500 text-xs'>{formatError.password}</p>}

                    <input
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 rounded-lg w-full border border-gray-300 focus:outline-none focus:border-purple-500"
                    />
                    {formatError && <p className='text-red-500 text-xs'>{formatError.confirmPassword}</p>}

                </div>

                <button
                    onClick={handleResetPassword}
                    disabled={loading}
                    className={`mt-6 w-full p-3 rounded-lg font-bold text-white bg-gradient-to-br from-purple-400 via-pink-300 to-orange-200 hover:bg-purple-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {loading ? t("resetPassword.loading") : t("resetPassword.confirm")}
                </button>


            </div>
        </div>
    );
}
