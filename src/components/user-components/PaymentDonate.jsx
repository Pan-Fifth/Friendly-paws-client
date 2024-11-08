

import React, { useEffect, useState, useTransition } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { sendPublishKey, createPaymentStripe } from "../../apis/PaymentApi";
import { sendEmailApi } from "../../apis/UserApi";
import useAuthStore from "../../stores/AuthStore";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/user-components/CheckoutForm";
import useDonationStore from "@/src/stores/DonationStore";
import { useTranslation } from "react-i18next";

function PaymentDonate() {
  const { t } = useTranslation()
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const amount = useDonationStore(state => state.donation.total)
  const { setPaymentMethod } = useDonationStore();




  const sendDonationConfirmationEmail = async () => {
    const recipient = user?.user?.email;
    const subject = t("payment.subject");
    const message = `Dear ${user?.user?.name},\n\nThank you for your generous donation of $${amount} to Friendly Paws. Your contribution helps us continue our mission of helping animals in need.\n\nBest regards,\nFriendly Paws Team`;

    try {
      const response = await sendEmailApi(recipient, subject, message, token);
      if (response.status === 200) {
        toast.success(t("payment.successToast"));
      }
    } catch (error) {
      toast.error(t("payment.errorToast"));
    }
  };

  useEffect(() => {
    const fetchPublishableKey = async () => {
      try {
        const response = await sendPublishKey();
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      } catch (error) {
        console.error("Error fetching publishable key:", error);
      }
    };

    fetchPublishableKey();
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await createPaymentStripe(amount);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, []);

  const handlePaymentSuccess = (paymentType) => {
    const method = paymentType === 'CARD' ? 'CREDIT' : 'PROMPTPAY';
    setPaymentMethod(method);
    sendDonationConfirmationEmail();
  };

  return (
    <>
      <h1 className="text-center">{t("payment.ChoosePayment")}</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}
    </>
  );
}

export default PaymentDonate;
