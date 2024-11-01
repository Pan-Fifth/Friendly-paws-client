
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import useAuthStore from '../../stores/AuthStore';
import { confirmPayment } from '../../apis/PaymentApi';
import useDonationStore from '@/src/stores/DonationStore';

export default function Completion() {
    const {donation} = useDonationStore()
    const user = useAuthStore((state) => state.user);
    const userId = user.id || 1
    console.log(user, "userrr")
    console.log(donation, "this is donation")
    useEffect(() => {
        
        const paymentData = {
            userId,
            amount: Number(donation.total),
            paymentMethod: donation.payment_method
        };
        async function clearCart() {
            try {
                // เรียก API เพื่อยืนยันการชำระเงินในเบื้องต้น
                const response = await confirmPayment(paymentData);

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