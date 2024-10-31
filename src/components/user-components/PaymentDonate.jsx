import React, { useEffect, useState } from 'react';


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { sendPublishKey, createPaymentStripe } from '../../apis/PaymentApi'

import CheckoutForm from "../../components/user-components/CheckoutForm";



function PaymentDonate({ amount }) {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const fetchPublishableKey = async () => {
            try {
                const response = await sendPublishKey()
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
                const response = await createPaymentStripe(amount)
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error creating payment intent:", error);
            }
        };

        createPaymentIntent();
    }, []);

    return (
        <>
            <h1 className='text-center'>Choose Payment</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}

export default PaymentDonate;
