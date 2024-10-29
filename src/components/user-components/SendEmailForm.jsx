import React, { useState } from 'react'
import useAuthStore from './../../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendEmailApi } from '../../apis/UserApi';

export default function SendEmailForm() {

    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error('Please log in to send an email');
            return navigate('/login');
        }
        if (user?.user?.role === "ADMIN") {
            toast.error('Admins cannot send emails.');
            return;
        }

        try {
            const response = await sendEmailApi(recipient, subject, message, token);
            if (response.status === 200) {
                setRecipient('');
                setSubject('');
                setMessage('');
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error('Failed to send email');
        }
    };

    return (
        <div className="flex items-center justify-center h-[500px]">
            <form onSubmit={handleSubmit} className="bg-slate-200 p-8 rounded-xl shadow-xl w-full max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Send Email</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter recipient's email"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold mb-1">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter email subject"
                        required
                        className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 font-semibold mb-1">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message"
                        required
                        className="w-full text-black px-4 py-2 border rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Send
                </button>
            </form>
        </div>
    )
}
