import React, { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import useAuthStore from "../../stores/AuthStore";

export default function CheckoutFormCredit({ onPaymentSuccess }) {
  const user = useAuthStore((state) => state.user);
  const elements = useElements();
  const stripe = useStripe();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

 const handleSubmit = async (e) => {
    try {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Add payment_method to return URL
                return_url: `${window.location.origin}/Completion?payment_method=${elements.getElement('payment').type}`,
            },
        });

        if (error) {
            setMessage(
                error.type === "card_error" || error.type === "validation_error"
                    ? t('checkoutForm.cardError')
                    : t('checkoutForm.unexpectedError')
            );
        }

        setIsProcessing(false);
    } catch (error) {
        console.error('Error confirming payment:', error);
        setMessage(('checkoutForm.paymentFailed'));
    }
};



  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        className=" w-full bg-green-500 mx-auto py-2 mt-2 rounded-lg font-head text-white"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text ">{isProcessing ? "Processing" : "Pay now"}</span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
