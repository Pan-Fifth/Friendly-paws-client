import axios from "axios";

export const confirmPayment = (paymentData) => {
    return axios.post('http://localhost:3000/payment/confirm-payment', paymentData);
};


export const sendPublishKey = () => {

    return axios.get("http://localhost:3000/payment/config")
}

export const createPaymentStripe = (amount) => {

    return axios.post("http://localhost:3000/payment/create-payment-intent", {
        amount: Math.round(amount * 100),
    });
}