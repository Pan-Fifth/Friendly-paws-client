import React, { useState } from 'react'
import useAuthStore from '../../stores/AuthStore';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../apis/AuthApi';

export default function ResetPassword() {

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
            console.error('Error:', error);
        }
    };


    return (
        <div className='bg-gray-300 mx-auto w-96 h-96 mt-40 rounded-md flex flex-col justify-center items-center gap-6 p-4 '>
            <h2 className='font-main'>Reset password</h2>
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
                Confirm
            </button>
            {message && <p>{message}</p>}
        </div>
    )
}
