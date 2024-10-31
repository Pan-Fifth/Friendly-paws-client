
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import useAuthStore from '../../stores/AuthStore';
import { confirmPayment } from '../../apis/PaymentApi';

export default function Completion() {

    const user = useAuthStore((state) => state.user);
    const userId = user.id
    console.log(user, "userrr")
    useEffect(() => {
        async function clearCart() {
            try {
                // เรียก API เพื่อยืนยันการชำระเงินในเบื้องต้น
                const response = await confirmPayment({
                    userId: userId,
                    amount: 1000, // Get this from your payment state/context
                    paymentMethod: 'CREDIT' // Specify the payment method being used
                });
                // แสดงข้อความยืนยันว่าการชำระเงินสำเร็จ
                Swal.fire({
                    title: 'Payment Confirmed!',
                    text: 'Your payment has been successfully confirmed.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            } catch (err) {
                console.error('Error confirming payment:', err);
                // setMessage('Payment confirmation failed.');
            }
        }

        clearCart()

    }, []);

    console.log(user, "this is user payment")

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

            <h2 className="text-4xl font-semibold text-gray-800 mt-4">Thank You! {user.firstname}</h2>
            <p className="text-gray-600 mt-2 text-center">
                Your payment has been successfully processed.
            </p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Back to Home Page
            </Link>
        </div>
    );
};