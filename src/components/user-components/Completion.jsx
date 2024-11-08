
import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import useAuthStore from '../../stores/AuthStore';
import { confirmPayment } from '../../apis/PaymentApi';
import useDonationStore from '@/src/stores/DonationStore';
import { useTranslation } from 'react-i18next';

export default function Completion() {

    const { t } = useTranslation()
    const donation = useDonationStore(state => state.donation)
    const setShowPaymentDialog = useDonationStore(state => state.setShowPaymentDialog)
    const user = useAuthStore((state) => state.user);
    const userId = user?.user.id
    useEffect(() => {

        const paymentData = {
            userId,
            amount: Number(donation.total),
            paymentMethod: donation.payment_method
        };
        async function clearCart() {
            try {
                // เรียก API เพื่อยืนยันการชำระเงินในเบื้องต้น
                setShowPaymentDialog(false)
                const response = await confirmPayment(paymentData);

                // แสดงข้อความยืนยันว่าการชำระเงินสำเร็จ
                Swal.fire({
                    title: t("payment.confirmedTitle"),
                    text: t("payment.confirmedText"),
                    icon: 'success',
                    confirmButtonText: t("payment.buttonText")
                })
            } catch (err) {
                console.error('Error confirming payment:', err);
                // setMessage('Payment confirmation failed.');
            }
        }

        clearCart()

    }, []);


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

            <h2 className="text-4xl font-semibold text-gray-800 mt-4">{t("payment.thankYou")} {user?.firstname}</h2>
            <p className="text-gray-600 mt-2 text-center">
                {t("payment.processed")}
            </p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                {t("payment.backToHome")}
            </Link>
        </div>
    );
};