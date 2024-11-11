import React, { useState } from 'react'
import { forgetPassword } from '../../apis/AuthApi';
import useAuthStore from '../../stores/AuthStore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function ForgetPassword() {
    const { t } = useTranslation()

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const isOpen = useAuthStore((state) => state.isOpen);
    const setIsOpen = useAuthStore((state) => state.setIsOpen);

    const handleForgetPassword = async () => {
        setLoading(true);
        try {

            const response = await forgetPassword(email);
            toast.success(response.data.message);
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
            setIsOpen(false);

        } catch (error) {

            toast.error(response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white w-11/12 max-w-md p-8 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
                <h2 className="font-bold text-2xl text-purple-500  mb-4 text-center">{t("navbar.sendEmail")}</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-3 w-full rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 text-gray-700 mb-4"
                />

                <button
                    onClick={handleForgetPassword}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold p-3 w-full rounded-lg transition-all duration-200 ease-in-out"
                >
                    {loading ? "Sending..." : t("navbar.send")}
                </button>

                <button
                    className="absolute top-2 right text-purple-500  hover:text-gray-700 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>

    )
}
