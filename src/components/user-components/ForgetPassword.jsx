import React, { useState } from 'react'
import { forgetPassword } from '../../apis/AuthApi';
import useAuthStore from '../../stores/AuthStore';

export default function ForgetPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const isOpen = useAuthStore((state) => state.isOpen);
    const setIsOpen = useAuthStore((state) => state.setIsOpen);

    const handleForgetPassword = async () => {
        try {

            const response = await forgetPassword(email);
            setMessage(response.data.message);
            setTimeout(() => {
                setIsOpen(false);
                setMessage("");
            }, 3000);

        } catch (error) {

            setMessage('Email not found');
            console.error('Error:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center gap-6">
                <h2 className='font-main'> Send email</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-black p-2 w-2/3 rounded-lg'
                />
                <button onClick={handleForgetPassword} className='bg-yellow p-2 rounded-lg font-head'>Send</button>
                {message && <p className='text-green-600'>{message}</p>}
                <button className='absolute top-0 right-0 p-2' onClick={() => setIsOpen(false)}>X</button>
            </div>
        </div>
    )
}
